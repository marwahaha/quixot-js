//print(ste_time_interval(1, 'day'));

var user = null;

var window = Mingui.window();
window.setDimension(4, 4, '50%', '50%');
window.setUndecorated(false);
window.onClose(function(param){
    print('closed' + param);
});

var loginMenu = window.addMenu("General", function () {
    
});

loginMenu.addItem("Log in", function () {
    window.showView('login_view')
}).visibleWhen(function () {
    return true;
}).enabledWhen(function () {
    return user == null;
});

loginMenu.addItem("Log out", function () {
    print("log out action")
});
loginMenu.addItem("Create acount", function () {
    print("create account")
});

var profileMenu = window.addMenu("Profile", function (evt) {
    print('clicked' + evt);
});

profileMenu.addItem("View profile", function (evt) {
   print('clicked...' + evt);
});


var socialMenu = window.addMenu("Social", function (evt) {
    print('clicked' + evt);
});

var submenu = socialMenu.addMenu("Posts", function (evt) {
    print('clicked' + evt);
});

submenu.addItem("published", function (evt) {
    print("clicked" + evt);
});

submenu.addItem("drafts", function (evt) {
    print("clicked" + evt);
});


var adminMenu = window.addMenu("Admin", function (evt) {
    print('clicked' + evt);
});





var loginForm = Mingui.form();

loginForm.addModel('loginUser', {number: 2, textName: 'gigi'});
loginForm.addInput("text", "textName", 'loginUser');

loginForm.onSubmit(function (id, data) {
    user = data;
    print(id + "== { " + data.number + ' , ' + data.textName + '}');
    print(JSON.stringify(user));
    window.verifyConditions();
});

loginForm.setSubmit("Create account");


//var view = ste_qui_view();
//view.setBackground(255, 0, 2);
//window.addView(view, 'red_view');

// var componentCount = window.setViewAtIndex(loginForm, 0);
// print('componentCount = ' + componentCount);

window.addView(loginForm, 'login_view');
window.display();
window.showView('login_view');
window.verifyConditions();



for(var i = 0; i < 5; i++){
    // ste_qui_notification_center.addNotification("title" + i, "text" + i, "https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg",
    //     i * 1000, function () {
    //         print("success");
    //     }, function () {
    //         print("error")
    //     }, function () {
    //         print("click");
    //     }, function () {
    //         print("close")
    //     });
}


