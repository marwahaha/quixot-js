package axl.stf.quixot.core.utilsmodel;

public interface UtilModel {
    void rsync(String source, String destination);
    void http_get(String url);
    void http_post(String url, String payload);
    void email_send(String data);

}
