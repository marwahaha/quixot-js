package axl.stf.quixot.core.utilsmodel;

public interface ChatModel {

    void chat_create_room(String roomName, int port);
    void chat_enter_room(String roomName, int port);
    void chat_send_message(String message);
}
