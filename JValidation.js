/*
author          :nasimi - prop-project.com
version         :0.2.5.3536
version state   :alpha version
date            :10/13/2012
last Update     :01/13/2013

*/

/* 

 validation_NotValid = function (c, e) {
      $( ... ).html('<span style="color:red">' + e.msg + '</span>');
  }

  validation_Valid = function (c, e) {
      $( ... ).html('');
  }

  validation
       .range({ min: 1, max: 50000, msg: 'عدد مورد نظر باید مابین 1 تا 50000 باشد' })
       .regex({ pattern: validation.regexPatterns.int, msg: 'فقط اعداد وارد نمایید' })         
       .set('#Id').group('group1');

  validation
      .required({ msg: '*' })
      .length({ min: 10, max: 30, msg: 'عبارت مورد نظر باید مابین 10 تا 30 کاراکتر باشد' })
      .regex({ pattern: validation.regexPatterns.mail, msg: 'ایمیل وارد نمائید' })
      .set('#Name').group('group2'); 

*/

var vis = new Array();

function validation_NotValid(ctl, validationPart) {
    if (ctl != null)
        ctl.css('border', 'solid 1px Red');
}

function validation_Valid(ctl, validationPart) {
    if (ctl != null)
        ctl.css('border', 'solid 1px Black');
}
/*
 shared properties and events

msg = '*',event(ctl,result,instance)*/
function validation_initialize() {
    if (validation.vi == null) {
        validation.vi = {
            group: 'default',
            ctl: null,
            required: null,// {  },
            range: null,//{   min: 0, max: 100 },
            integer: null,//{}
            real: null,//{}
            mail: null,//{}
            largeThan: null,//{   min: null, checkEqual: false },
            lowerThan: null,//{  max: null, checkEqual: false },
            largeThanLen: null,//{   min: null, checkEqual: false },
            lowerThanLen: null,//{  max: null, checkEqual: false },
            length: null,//{   min: 0, max: 100 },
            match: null,//{   value: null }, 
            regex: null,//{  pattern: null }
            notValid: function (ctl, validationPart) {
                validation_NotValid(ctl, validationPart);
            },
            valid: function (ctl, validationPart) {
                validation_Valid(ctl, validationPart);
            }
        };
    }
}

var validation =
    {
        vi: {
            group: 'default',
            ctl: null,
            required: null,// {  },
            range: null,//{   min: 0, max: 100 },
            length: null,//{   min: 0, max: 100 },
            integer: null,//{}
            real: null,//{}
            mail: null,//{}
            largeThan: null,//{   min: null, checkEqual: false },
            lowerThan: null,//{  max: null, checkEqual: false },
            largeThanLen: null,//{   min: null, checkEqual: false },
            lowerThanLen: null,//{  max: null, checkEqual: false },
            length: null,//{   min: 0, max: 100 },
            match: null,//{   value: null }, 
            regex: null,//{  pattern: null }
            notValid: function (ctl, validationPart) {
                validation_NotValid(ctl, validationPart)
            },
            valid: function (ctl, validationPart) {
                validation_Valid(ctl, validationPart)
            }
        },
        regexPatterns: {
            mail: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            int: /^[-+]?\d*$/,
            real: /^(((\d{1,3})(,\d{3})*)|(\d+))(.\d+)?$/,
            latinText: /^[\s|a-zA-Z0-9.,_-]*$/,
            persianText: /^[ا-ی]*[\s|]+[ا-ی\s|]*$/,
            persianName: /^[ا-ی]*[\s|]+[ا-ی\s|]*$/,
            text: /^[\s|a-zA-Zا-ی0-9.,_-]*$/
        },
        get: function (ctl) {

            this.loadInstance(this.getInstance(ctl));
            return validation;
        },
        set: function (ctl, group) {

            if (ctl == null && ctl == undefined) throw "please set control for add validation . reference: addInstances methode";

            this.vi.ctl = $(ctl);

            var key = vis.length;

            if (group != null && group != undefined)
                this.vi.group = group;

            var newVI = this.vi;

            vis[key] = newVI;

            $(ctl).attr('validationKey', key);

            $(ctl).blur(function () { validation.get(this).validate(); });
            $(ctl).keydown(function () { validation.get(this).validate(ctl); });
            $(ctl).focus(function () { validation.get(this).validate(ctl); });
            $(ctl).keyup(function () { validation.get(this).validate(ctl); });

            this.vi = {
                group: 'default',
                ctl: null,
                required: null,// {  },
                range: null,//{   min: 0, max: 100 },
                integer: null,//{}
                real: null,//{}
                mail: null,//{}
                largeThan: null,//{   min: null, checkEqual: false },
                lowerThan: null,//{  max: null, checkEqual: false },
                largeThanLen: null,//{   min: null, checkEqual: false },
                lowerThanLen: null,//{  max: null, checkEqual: false },
                length: null,//{   min: 0, max: 100 },
                match: null,//{   value: null }, 
                regex: null,//{  pattern: null }
                notValid: function (ctl, validationPart) {
                    validation_NotValid(ctl, validationPart);
                },
                valid: function (ctl, validationPart) {
                    validation_Valid(ctl, validationPart);
                }
            };

            return validation;
        },
        loadInstance: function (vi) {
            this.vi = vi;
            return validation;
        },
        required: function (o) { validation_initialize(); this.vi.required = o; return validation; },
        range: function (o) {
            validation_initialize(); this.vi.range = o; return validation;
        },
        integer: function (o) {
            validation_initialize(); this.vi.integer = o; return validation;
        },
        real: function (o) { validation_initialize(); this.vi.real = o; return validation; },
        mail: function (o) { validation_initialize(); this.vi.mail = o; return validation; },
        largeThan: function (o) { validation_initialize(); this.vi.largeThan = o; return validation; },
        lowerThan: function (o) { validation_initialize(); this.vi.lowerThan = o; return validation; },
        largeThanLen: function (o) { validation_initialize(); this.vi.largeThanLen = o; return validation; },
        lowerThanLen: function (o) { validation_initialize(); this.vi.lowerThanLen = o; return validation; },
        length: function (o) {
            validation_initialize(); this.vi.length = o; return validation;
        },
        match: function (o) { validation_initialize(); this.vi.match = o; return validation; },
        regex: function (o) { validation_initialize(); this.vi.regex = o; return validation; },
        notValid: function (o) { validation_initialize(); this.vi.notValid = o; return validation; },
        valid: function (o) { validation_initialize(); this.vi.valid = o; return validation; },

        getInstance: function (ctl) {

            if ($(ctl).attr('validationKey') != null && $(ctl).attr('validationKey') != undefined)
                return vis[$(ctl).attr('validationKey')];
            return null;
        },
        group: function (grp) {
            if (this.vi == null) return validation;
            this.vi.group = grp;
            return validation;
        },
        validate: function () {

            var result = true;
            if (this.vi == null) return result;

            if (this.vi.required != null && this.vi.ctl.val() == "") {
                this.vi.notValid(this.vi.ctl, this.vi.required); result = false;
            }
            else {

                if (this.vi.range != null) {
                    var min = 0; eval('min = ' + this.vi.range.min);
                    var max = 0; eval('max = ' + this.vi.range.max);

                    if (this.vi.ctl.val().valueOf() * 1.0 < min || this.vi.ctl.val().valueOf() * 1.0 > max) {
                        this.vi.notValid(this.vi.ctl, this.vi.range); result = false;
                    }
                }


                if (this.vi.length != null) {
                    var min = 0; eval('min = ' + this.vi.length.min);
                    var max = 0; eval('max = ' + this.vi.length.max);

                    if (this.vi.ctl.val().length < min || this.vi.ctl.val().length > max) {
                        this.vi.notValid(this.vi.ctl, this.vi.length); result = false;
                    }
                }

                if (this.vi.largeThanLen != null) {

                    var min = 0; eval('min = ' + this.vi.largeThanLen.min);

                    if (this.vi.ctl.val().length < min) {
                        this.vi.notValid(this.vi.ctl, this.vi.largeThanLen); result = false;
                    }

                }

                if (this.vi.lowerThanLen != null) {

                    var max = 0; eval('max = ' + this.vi.lowerThanLen.max);

                    if (this.vi.ctl.val().length > max) {
                        this.vi.notValid(this.vi.ctl, this.vi.lowerThanLen); result = false;
                    }

                }

                if (this.vi.largeThan != null) {

                    var min = 0; eval('min = ' + this.vi.largeThan.min);

                    if (this.vi.ctl.val().valueOf() * 1.0 < min) {
                        this.vi.notValid(this.vi.ctl, this.vi.largeThan); result = false;
                    }

                }

                if (this.vi.lowerThan != null) {

                    var max = 0; eval('max = ' + this.vi.largeThan.max);

                    if (this.vi.ctl.val().valueOf() * 1.0 > max) {
                        this.vi.notValid(this.vi.ctl, this.vi.largeThan); result = false;
                    }

                }

                if (this.vi.match != null) {

                    var val = 0; eval('val = ' + this.vi.match.value);

                    if (this.vi.ctl.val() != value.toString()) {
                        this.vi.notValid(this.vi.ctl, this.vi.match); result = false;
                    }

                }

                if (this.vi.regex != null) {
                    var pattern = "";
                    eval(' pattern = ' + this.vi.regex.pattern);

                    if (!this.vi.ctl.val().toString().match(pattern)) {
                        this.vi.notValid(this.vi.ctl, this.vi.regex); result = false;
                    }
                }

                if (this.vi.integer != null) {
                    eval(' pattern = ' + this.regexPatterns.int);

                    if (!this.vi.ctl.val().toString().match(pattern)) {
                        this.vi.notValid(this.vi.ctl, this.vi.integer); result = false;
                    }
                }

                if (this.vi.real != null) {
                    eval(' pattern = ' + this.regexPatterns.real);

                    if (!this.vi.ctl.val().toString().match(pattern)) {
                        this.vi.notValid(this.vi.ctl, this.vi.real); result = false;
                    }
                }

                if (this.vi.mail != null) {
                    eval(' pattern = ' + this.regexPatterns.mail);

                    if (!this.vi.ctl.val().toString().match(pattern)) {
                        this.vi.notValid(this.vi.ctl, this.vi.mail); result = false;
                    }
                }
            }

            if (result) this.vi.valid(this.vi.ctl, this.vi)

            return result;
        }
    };

function validateControl(ctl) {
    return validation.loadInstance(validation.getInstance(ctl)).validate();
}

function validate(group, init) {
    var valid = true;
    if (group == null && group == undefined)
        group = "default";
    for (var i = 0; i < vis.length; i++) {
        if (vis[i].group == group) {
            valid = validation.loadInstance(vis[i]).validate() && valid;
            if (init != undefined)
                init(vis[i].ctl);
        }
    }

    return valid;
}







