package axl.stf.quixot.ui.swingwraps;

import jdk.nashorn.api.scripting.AbstractJSObject;
import jdk.nashorn.api.scripting.JSObject;

import java.awt.event.KeyEvent;
import java.awt.event.MouseEvent;
import java.util.ArrayList;
import java.util.List;

public class EventStack<J> {

    List<JSObject> clicks = new ArrayList<>();
    List<JSObject> mouseDowns = new ArrayList<>();
    List<JSObject> mouseOvers = new ArrayList<>();
    List<JSObject> mouseOuts = new ArrayList<>();
    List<JSObject> mouseUps = new ArrayList<>();
    List<JSObject> keyPresses = new ArrayList<>();
    List<JSObject> closeActions = new ArrayList<>();
    List<JSObject> resizeActions = new ArrayList<>();

    JSObject editableWhen = new AbstractJSObject() {
        @Override
        public Object call(Object thiz, Object... args) {
            return true;
        }
    };
    JSObject visibleCondition = new AbstractJSObject() {
        @Override
        public Object call(Object thiz, Object... args) {
            return true;
        }
    };

    public boolean isVisible(){
        Boolean r = true;
        if(visibleCondition != null){
            try {
                 r = (Boolean) visibleCondition.call(null);
            } finally {
                return r;
            }
        }
        return false;
    }

    public boolean isEnabled(){
        Boolean r = true;
        if(editableWhen != null){
            try {
                r = (Boolean) editableWhen.call(null);
            } finally {
                return r;
            }
        }
        return false;
    }

    public JSObject getEnabledCondition() {
        return editableWhen;
    }

    public JSObject getVisibleCondition() {
        return visibleCondition;
    }

    public void setVisibleCondition(JSObject visibleCondition) {
        this.visibleCondition = visibleCondition;
    }

    public void callClose(Object argument, Object ... args){
        for(JSObject object: closeActions){
            object.call(argument, args);
        }
    }

    public void callResize(Object argument, Object ... args){
        for(JSObject object: resizeActions){
            object.call(argument, args);
        }
    }

    public void callClicks(Object argument, Object ... args){
        for(JSObject object: clicks){
            object.call(argument, args);
        }
    }

    public void callMouseOvers(Object argument, Object ... args){
        for(JSObject object: mouseOvers){
            object.call(argument, args);
        }
    }

    public void callMouseOuts(Object argument, Object ... args){
        for(JSObject object: mouseOuts){
            object.call(argument, args);
        }
    }

            public void callMouseDown(Object argument, Object ... args){
        for(JSObject object: mouseDowns){
            object.call(argument, args);
        }
    };

        public void callMouseUp(Object argument, Object ... args){
        for(JSObject object: mouseUps){
            object.call(argument, args);
        }
    };

    public void callKeyPress(Object argument, Object ... args){
        for(JSObject object: mouseUps){
            object.call(argument, args);
        }
    };

    public void solveOnClick(JSObject... callbacks) {
        for(JSObject object: callbacks){
            clicks.add(object);
        }
    };

    public  void solveOnMouseDown(JSObject... callbacks){
        for(JSObject object: callbacks){
            mouseDowns.add(object);
        }
    };

    public  void solveOnMouseUp(JSObject... callbacks){
        for(JSObject object: callbacks){
            mouseUps.add(object);
        }
    };

    public void solveOnKeyPress(JSObject... callbacks){
        for(JSObject object: callbacks){
            keyPresses.add(object);
        }
    };

    public void solveClose(JSObject... callbacks){
        for(JSObject object: callbacks){
            closeActions.add(object);
        }
    };

    public void solveResize(JSObject... callbacks){
        for(JSObject object: callbacks){
            resizeActions.add(object);
        }
    }

    public void solveOnMouseOver(JSObject... callbacks){
        for(JSObject object: callbacks){
            mouseOvers.add(object);
        }
    }

    public void solveOnMouseOut(JSObject... callbacks){
        for(JSObject object: callbacks){
            mouseOuts.add(object);
        }
    }

    public void callMouseDrag(Object argument, Object ... args) {

    }

    public void callMouseMove(Object argument, Object ... args) {
    }

    public void callKeyUp(Object argument, Object ... args) {
    }

    public void setEditableCondition(JSObject editableWhen) {
        this.editableWhen = editableWhen;
    }
}

