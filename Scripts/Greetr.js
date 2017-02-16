(function (global, $) {

    var Greetr = function (firstName, lastName, language) {

        return new Greetr.init(firstName, lastName, language);

    }
    var supportedLangs = ['en', 'es'];

    var greetings = {
        en: 'Hello',
        es: 'Hola'
    };
    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos'
    };

    //setting greatr.prototype - all objects created will have reference to this functions
    Greetr.prototype = {
        fullName: function () {
            return this.firstName + ' ' + this.lastName;
        },
        validate: function () {
            if (supportedLangs.indexOf(this.language) === -1) {
                throw 'invalid language';
            }
        },
        greetings: function () {
            return greetings[this.language] + ' ' + this.fullName();
        },
        formalGreetings: function () {
            return formalGreetings[this.language] + ' ' + this.fullName();
        },
        greet: function (isFormal) {
            var msg;
            if (isFormal) {
                msg = this.formalGreetings();
            }
            else {
                msg = this.greetings();
            }
            //print it to console:
            if (console) {
                console.log(msg);
            }
          
            return this; //by returning the object we can chain methods ()()()
        },
        setLang: function (language) {
            this.language = language;
            this.validate();
            return this; //make the method chainable ()()()
        },
        HTMLGreeting: function (selector, isFormal) {
            //checking if jquery library loaded:
            if (!$) {
                throw 'jQuery not loaded'
            }
            //check if selector var exist:
            if (!selector) {
                throw 'missing jQuery Selector';
            }

            var msg;
            if (isFormal) {
                msg = this.formalGreetings();
            }
            else {
                msg = this.greet();
            }
            //set Greeting string in the DOM using jquery:
            $(selector).html(msg);

            return this; //making method chainable ()()
        }
        

    };
    //constructor function:
    Greetr.init = function (firstName, lastName, language) {
        var self = this;
        self.firstName = firstName || 'default';
        self.lastName = lastName || 'default';
        self.language = language || 'en';

    }
    //make the prototype of the object created point to Greetr.prototype (instead of greetr.inti.prototype)
    Greetr.init.prototype = Greetr.prototype;
    //expose greetr to the global object:
    global.G$ = global.Greetr = Greetr;
    

})(window,jQuery);