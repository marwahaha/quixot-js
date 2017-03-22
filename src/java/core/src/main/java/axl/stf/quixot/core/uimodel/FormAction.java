package axl.stf.quixot.core.uimodel;

public enum FormAction {
    PUT("visibility", "insertable|visible"),
    POST("update", "editable|visible"),
    DELETE("delete"),
    GET("read", "visible");

    private final String desc;
    private final String desc2;

    FormAction(String desc, String desc2){
        this.desc = desc;
        this.desc2 = desc2;
    }

    FormAction(String desc){
        this.desc = desc;
        this.desc2 = "xxx";
    }
}
