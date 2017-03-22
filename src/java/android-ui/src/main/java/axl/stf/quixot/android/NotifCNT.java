package axl.stf.quixot.android;

/**
 * Created by Alexandru.Stefan on 3/17/2017.
 */
public class NotifCNT {

    public String getSuccessCallback() {
        return successCallback;
    }

    public String getFailureCallback() {
        return failureCallback;
    }

    public String getClickHandler() {
        return clickHandler;
    }

    public String getCloseHandler() {
        return closeHandler;
    }

    private final String successCallback;
    private final String failureCallback;
    private final String clickHandler;
    private final String closeHandler;

    public NotifCNT(String successCallback, String failureCallback, String clickHandler, String closeHandler){
        this.successCallback = successCallback;
        this.failureCallback = failureCallback;
        this.clickHandler = clickHandler;
        this.closeHandler = closeHandler;
    }
}
