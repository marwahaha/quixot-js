package axl.stf.quixot.core.tween;

public abstract class TweenEvent {
    public void onUpdate(double value){

    };

    public void onUpdate(int index, double value){
        this.onUpdate(value);
    };
}
