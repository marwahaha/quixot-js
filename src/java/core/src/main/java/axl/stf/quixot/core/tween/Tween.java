package axl.stf.quixot.core.tween;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class Tween {
    private final Easing easing;

    public TweenEvent getEvent() {
        return tweenEvent;
    }

    public Tween setEvent(TweenEvent tweenEvent) {
        this.tweenEvent = tweenEvent;
        return this;
    }

    private TweenEvent tweenEvent;

    public Tween(Easing easing){
        this.easing = easing;
    }

    public void animate(double start, double end, int steps, final int miliseconds){
        final double data[] = easing.model(start, end, steps);

       final ScheduledExecutorService executorService = Executors.newSingleThreadScheduledExecutor();

        final int n[] = {0};
//        executorService.scheduleAtFixedRate(new Runnable() {
//            @Override
//            public void run() {
//                if(n[0] > data.length - 1){
//                    executorService.shutdown();
//                } else {
//
//                    if (tweenEvent != null){
//                        tweenEvent.onUpdate(n[0], data[n[0]]);
//                    }
//                }
//                n[0]++;
//            }
//        });
//        executorService.scheduleAtFixedRate(() -> {
//            if(n[0] > data.length - 1){
//                executorService.shutdown();
//            } else {
//
//                if (tweenEvent != null){
//                    tweenEvent.onUpdate(n[0], data[n[0]]);
//                }
//            }
//            n[0]++;
//        }, 0, miliseconds, TimeUnit.MILLISECONDS);


    }


    public static void main(String[] args) {
        new Tween(Easing.BASIC).setEvent(new TweenEvent() {
            @Override
            public void onUpdate(double value) {
                System.out.println(" acum " + value);
            }
        }).animate(1, 20, 20, 100);
    }

}
