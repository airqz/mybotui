var botui = new BotUI('home-demo');

var firstname = null;
var email = null;
var message = null;

botui.message.add({
  loading: false, // set to true if you want to show a loading state '3 animated dots'. available in version >= 0.3.1
  delay: 0, // wait before showing the message. in milliseconds.
  type: 'text', // either 'text' or 'embed'
  content: 'Hello, I am the assistant of the website "pour 1 besoin"', // Should be a URL if type is 'embed', text otherwise.
  human: false, // should be shown aligned to right side?
  cssClass: 'foo', // a string or array of custom CSS classes you want to be added.
}).then(function () {

  botui.message.add({
    loading: true, // set to true if you want to show a loading state '3 animated dots'. available in version >= 0.3.1
    delay: 1200, // wait before showing the message. in milliseconds.
    type: 'text', // either 'text' or 'embed'
    content: 'This experience was created to let you know everything about my services', // Should be a URL if type is 'embed', text otherwise.
    human: false, // should be shown aligned to right side?
    cssClass: 'bar', // a string or array of custom CSS classes you want to be added.
  }).then(function (index) {
    console.log("index", index);
    //indexes.push(index);

    botui.message.add({
      loading: true, // set to true if you want to show a loading state '3 animated dots'. available in version >= 0.3.1
      delay: 1500, // wait before showing the message. in milliseconds.
      type: 'text', // either 'text' or 'embed'
      content: 'Would you like to see the benefits? or sent a message', // Should be a URL if type is 'embed', text otherwise.
      human: false, // should be shown aligned to right side?
      cssClass: 'bar', // a string or array of custom CSS classes you want to be added.
    }).then(function () {
      botui.action.button({
        delay: 1000,
        action: [{
          text: 'See benefits !',
          value: 'skip'
        }, {
          text: 'Sent a message',
          value: 'sure'
        }]
      }).then(function(response) {
        if(response.value == 'sure') {
          rmessage();
        }
        if(response.value == 'skip') {
          prestations();
        }

      })
    })
  });
});


var askAddress = function () {
  botui.message.add({
    delay: 1000,
    content: "Ok, leave me your email for an answer"
  }).then(function (index) {
    botui.action.text({
      delay: 800,
      action: {
        size: 30,
        icon: 'mail',
        value: '',
        placeholder: 'your email'
      }
  }).then(function (response) {
    if (/^.*@.*$/.test(response.value))
     {
       smessage();
     } else {
       alert("You have entered an invalid email address!")
       askAddress();
     }
    }).then(function (response) {
      email = response.value;
      console.log(email);
      botui.message.bot({
        delay: 800,
        content: 'your email : ' + response.value
      }).then(function (response) {
        botui.action.button({
          delay: 1000,
          action: [{
            icon: 'check',
            text: 'I confirm',
            value: 'confirm'
          }, {
            icon: 'pencil',
            text: 'Editing the email address',
            value: 'edit'
          }]
        }).then(function (response) {
          if(response.value === 'confirm') {
            //TODO
            smessage();
          } else {
            askAddress();
          }
        })
      })

    })
  })
};



var send = function (firstname, email, message) {
  botui.message.add({
    delay: 500,
    content: 'Thank you. Your message will be sent soon.'
  });

  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
  xmlhttp.open("POST", "mail.php", true);
  //xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  //xmlhttp.send(JSON.stringify({firstname: firstname, time:"2pm", email: email, message: message}));
  xmlhttp.send("firstname="+firstname+"&email="+email+"&message="+message);
};


var smessage = function () {
  botui.message.add({
    delay: 1000,
    content: "Your message"
  }).then(function (index) {
    botui.action.text({
      delay: 800,
      action: {
        size: 40,
        placeholder: 'Message'
      }
    }).then(function (response) {
      message = response.value;
      botui.message.bot({
        delay: 800,
        content: 'Your message : ' + response.value
      }).then(function (index) {
        botui.action.button({
          delay: 1000,
          action: [{
            icon: 'check',
            text: 'ok, sent the message',
            value: 'confirm'
          }, {
            icon: 'pencil',
            text: 'Retry',
            value: 'edit'
          }]
        }).then(function (response) {
          if(response.value === 'confirm') {
            send(firstname, email, message);
          } else {
            smessage();
          }
        })
      })
    })
  })
};


var rmessage = function () {
  botui.message.add({
    delay: 1000,
    content: "Okay, what\'s your name?"
  }).then(function (index) {
    botui.action.text({
      delay: 1000,
      action: {
        value: '',
        placeholder: 'Your first name'
      }
    }).then(function (response) {
      firstname = response.value;
      console.log(firstname);
      botui.message.bot({
        delay: 1000,
        content: ' Welcome  ' + response.value + ''
      }).then(function () {
      botui.message.add({
        delay: 1500,
        content: 'I am Rodolphe'
        }).then(function (index) {
          botui.message.bot({
            delay: 1000,
            content: 'You have a question ?'
          }).then(askAddress)
        })
      })
    })
  })
};



var prestations = function () {
  botui.message.add({
    delay: 1000,
    content: '[Digital Innovation Strategy Consulting](https://pour1besoin.fr/prestation)'
  }).then(function () {
    botui.message.add({
      delay: 1500,
      type: 'embed',
      content: 'https://giphy.com/embed/v1PSPwbLIrata'
    }).then(function () {
      botui.message.add({
        delay: 1500,
        content: 'Website creation'
      }).then(function () {
        botui.message.add({
          delay: 1500,
          type: 'embed',
          content: 'https://giphy.com/embed/hMOUzHtFPtsru'
        }).then(function () {
          botui.message.add({
            delay: 1500,
            content: 'Study and consulting in natural referencing'
          }).then(function () {
            botui.message.add({
              delay: 1500,
              content: 'Objective to enhance the attractiveness of your brand'
            }).then(function () {
              botui.message.add({
                delay: 1500,
                content: '!(book) [Look docs.botui.org](https://docs.botui.org), or see my account! (instagram) [Instagram](https://www.instagram.com/rodolphe_photography/)'
              })
            })
          })
        })
      })
    })
  })
};


