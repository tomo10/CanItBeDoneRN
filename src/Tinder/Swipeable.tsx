import * as React from "react";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { StyleSheet } from 'react-native';
import { onGestureEvent } from "react-native-redash";

const {
  Clock,
  Value,
  block,
  cond,
  not,
  clockRunning,
  startClock,
  timing: reTiming,
  spring: reSpring,
  stopClock,
  add,
  multiply,
  call,
  and,
  eq,
  abs,
  sub,
  neq,
  set,
  defined,
  useCode
} = Animated;

interface WithSpringParams {
  value: Animated.Adaptable<number>;
  velocity: Animated.Adaptable<number>;
  state: Animated.Value<State>;
  snapPoint: number
  offset?: Animated.Value<number>;
  config?: SpringConfig;
  onSnap?: (value: readonly number[]) => void;
}

const withSpring = (props: WithSpringParams) => {
  const {
    value,
    velocity,
    state,
    snapPoint,
    offset,
    config: springConfig,
    onSnap
  } = {
    offset: new Value(0),
    ...props
  };
  const clock = new Clock();
  const springState: Animated.SpringState = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0)
  };

  const config: PrivateSpringConfig = {
    toValue: new Value(0),
    damping: 15,
    mass: 1,
    stiffness: 150,
    overshootClamping: false,
    restSpeedThreshold: 1,
    restDisplacementThreshold: 1,
    ...springConfig
  };

  const gestureAndAnimationIsOver = new Value(1);
  const isSpringInterrupted = and(eq(state, State.BEGAN), clockRunning(clock));
  const finishSpring = [
    set(offset, springState.position),
    stopClock(clock),
    set(gestureAndAnimationIsOver, 1)
  ];
  const snap = onSnap
    ? [cond(clockRunning(clock), call([springState.position], onSnap))]
    : [];
  return block([
    cond(isSpringInterrupted, finishSpring),
    cond(gestureAndAnimationIsOver, set(springState.position, offset)),
    cond(neq(state, State.END), [
      set(gestureAndAnimationIsOver, 0),
      set(springState.finished, 0),
      set(springState.position, add(offset, value))
    ]),
    cond(and(eq(state, State.END), not(gestureAndAnimationIsOver)), [
      cond(and(not(clockRunning(clock)), not(springState.finished)), [
        set(springState.velocity, velocity),
        set(springState.time, 0),
        set(
          config.toValue, snapPoint),

        //   snapPoint(springState.position, velocity, snapPoint)
        // ),
        startClock(clock)
      ]),
      reSpring(clock, springState, config),
      cond(springState.finished, [...snap, ...finishSpring])
    ]),
    springState.position
  ]);
};

interface SwipeableProps {
  translateX: Animated.Value<number>;
  translateY: Animated.Value<number>;
}

export default ({ translateX, translateY }: SwipeableProps) => {
  const translationX = new Value(0);
  const translationY = new Value(0);
  const velocityX = new Value(0);
  const velocityY = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const gestureHandler = onGestureEvent({
    translationX,
    translationY,
    velocityX,
    velocityY,
    state
  })
  const x = withSpring({
    value: translationX,
    velocity: velocityX,
    state,
    snapPoints: 0
  });
  const y = withSpring({
    value: translationY,
    velocity: velocityY,
    state,
    snapPoints: 0
  });

  useCode(block([set(translateX, x), set(translateY, y)]), []);

  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View style={StyleSheet.absoluteFill} />
    </PanGestureHandler>
  );
};
