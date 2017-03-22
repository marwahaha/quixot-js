package axl.stf.quixot;

import axl.stf.quixot.core.cerv.TimeInterval;
import axl.stf.quixot.ui.constructors.GenericConstructor;
import axl.stf.quixot.ui.swingwraps.*;
import axl.stf.quixot.ui.swingwraps.inputs.*;
import jdk.nashorn.api.scripting.NashornScriptEngineFactory;

import javax.script.ScriptEngine;

public class DesktopEngine implements StandardEngine<ScriptEngine> {

    @Override
    public ScriptEngine getInstance() {
        NashornScriptEngineFactory factory = new NashornScriptEngineFactory();
        ScriptEngine engine = factory.getScriptEngine("-strict", "--no-java", "--no-syntax-extensions");

        engine.put("Mingui", new DesktopModelConstructor());

//        engine.put("ste_gui_window", new GenericConstructor(Window.class));
//        engine.put("ste_gui_form", new GenericConstructor(SwingForm.class));
//        engine.put("ste_gui_button", new GenericConstructor(SubmitButton.class));
//        engine.put("ste_gui_confirm_buttons", new GenericConstructor(ConfirmButtons.class));
//        engine.put("ste_gui_passwd", new GenericConstructor(PasswordInput.class));
//        engine.put("ste_gui_text_field", new GenericConstructor(TextField.class));
//        engine.put("ste_gui_numeric_input", new GenericConstructor(NumericInput.class));
//        engine.put("ste_gui_slider", new GenericConstructor(Slider.class));
//        engine.put("ste_gui_label", new GenericConstructor(Label.class));
//
//        engine.put("ste_time_interval", new TimeInterval());
//        engine.put("ste_qui_notification_center", NotificationCenter.getInstance());

        return engine;

    }
}
