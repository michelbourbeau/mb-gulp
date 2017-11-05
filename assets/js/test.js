var testFunction = function(dev) {
    var $msg = $('#msg');
    
    if(dev != 'Mike') {
        $msg.text('testFunction() is Broken!!');
        return false;
    }
    else {
        $msg.text('Well done ' + dev + '! testFunction() is working just fine.');
    }
}
