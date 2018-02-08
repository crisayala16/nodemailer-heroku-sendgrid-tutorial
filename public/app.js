$(document).ready(function(){
    $('.parallax').parallax();

    $(document).on('change', '.checkInput', function(event){
      let name = $('#name').val();
      let email = $('#email').val();
      let message = $('#message').val();

      if(name !== '' && email !== ''){
        $('#submit').attr('disabled', false);
      }
      else if(name === '' || email === ''){
        $('#submit').attr('disabled', true);        
      }
    });

    $(document).on('click', '#submit', function(event){
      event.preventDefault();
      const queryUrl = "https://api.giphy.com/v1/gifs/random?tag=dog&api_key=dc6zaTOxFJmzC&rating=g";
      $.get(queryUrl, (data)=>{
        let gif = data.data.image_url;
        let name = $('#name').val();
        let email = $('#email').val();
        let message = $('#message').val();
        
        $.post('/sendEmail', {
          name: name,
          email: email,
          message: message,
          gif: gif
        }).done((data)=>{
          console.log(data);
          if(data.success){
            $('#name').val('');
            $('#email').val('');
            $('#message').val('');
            Materialize.toast('Email is on its way!', 4000);
          }
        });
      });
    });
  });