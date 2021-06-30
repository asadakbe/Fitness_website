/* 
    Modal
*/

var modal = $('.modalBox');

$('.login').click(function() {
    modal.show();
});

$('.close').click(function() {
    modal.hide();
});

/* 
    password match
*/

var $password = $('#password');
var $confirmPassword = $('#confirm_password');

$('form span').hide();

function isPasswordValid() {
    return $password.val().length > 8;
}

function arePasswordsMatching() {
    return $password.val() === $confirmPassword.val();
}

function canSubmit() {
    return isPasswordValid() && arePasswordsMatching();
}

function passwordEvent() {
    if(isPasswordValid()) {
        $password.next().hide();
    } else {
        $password.next().show();
    }
}


function confirmPasswordEvent() {
    if(arePasswordsMatching()) {
        $confirmPassword.next().hide();
    } else {
        $confirmPassword.next().show();
    }
}

function enableSubmitEvent() {
    $('#submit').prop('disabled', !canSubmit());
}

$password.focus(passwordEvent).keyup(passwordEvent).keyup(confirmPasswordEvent).keyup(enableSubmitEvent)

$confirmPassword.focus(confirmPasswordEvent).keyup(confirmPasswordEvent).keyup(enableSubmitEvent)

enableSubmitEvent();

/* 
    Tab
*/

$('.tab-list a').click(function(event) {
    event.preventDefault();

    $('.active').removeClass('active');
    $(this).addClass('active');

    var id = this.id;
    $('.' + id).addClass('active');
})

/* 
    go to top
*/

$(window).scroll(function() {
    if($(this).scrollTop() > 200) {
        $('#gotop').show();
    } else {
        $('#gotop').hide();
    }
})

// click event on gotop button
$('#gotop').click(function(){
    $('html, body').animate({
        scrollTop: 0
    }, 'slow');
    return false
})

/* 
    horizontal scroll bar
*/

$(window).scroll(function() {
    var windowScroll = $(window).scrollTop();
    var height = $(document).height() - $(window).height();
    var scrolled = (windowScroll / height) * 100;
    $('#scrollBar').css('width', scrolled + '%')
})

/* 
    sticky header
*/

var headerPosition = $('.header').offset().top;

$(window).scroll(function() {
    var scrollValue = $(window).scrollTop();
    if(scrollValue > headerPosition) {
        $('.header').addClass('sticky');
    } else {
        $('.header').removeClass('sticky')
    }
})

/* 
    anchor link
*/

var topOffset;

$(window).scroll(function() {
	if($(this).scrollTop() < 1) {
	 topOffset = 138;
	} else {
	 topOffset = 53;
  }
});

$('#nav a[href^="#"]').on('click', function(event) {
  $('.navActive').removeClass('navActive');
  $(this).addClass('navActive');

  var target = $(this.getAttribute('href'));
  if( target.length ) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top - topOffset
      }, 1000);
  }
});

/* 
    read more in content
*/

var showCharacter = 100;
var moretext = "Read More";
var lesstext = "Read Less";

$('.whyusBlock .cols p').each(function(){
  var content = $(this).html();
  
  if(content.length > showCharacter) {
    var showContent = content.substr(0, showCharacter);
    var hideContent = content.substr(showCharacter);
    var fullContent = showContent + ' <div class="morecontent"><div>' + hideContent + '</div><a href="" class="morelink">' + moretext + '</a></div>'
		$(this).html(fullContent);
  }
});


$('.morelink').click(function(){
  if($(this).hasClass('less')){
    $(this).removeClass('less');
    $(this).html(moretext);
  } else {
    $(this).addClass('less');
    $(this).html(lesstext);
  }

  $(this).prev().slideToggle('slow');

  return false;
});

/* 
    accordion
*/

$('.accordion .content').hide();
$('.accordion .content').first().show();

$('.accordion .title').click(function(event) {
    event.preventDefault();

    $('.accordionActive').removeClass('accordionActive')
    $(this).addClass('accordionActive');

    $('.accordion .content').slideUp();
    $(this).next().slideDown();
})

/* 
    text limit
*/

$('.blogBlock .content p').html(function(index, currentText) {
    var maxLength = $(this).attr('data-maxlength');

    if(currentText.length >= maxLength) {
        return currentText.substr(0, maxLength) + '...';
    } else {
        return currentText;
    }
})

/* 
    load more posts
*/

$('.blogBlock .holder').slice(0, 2).show();
$('#btnMore').on('click', function(event) {
    event.preventDefault();
    $('.blogBlock .holder:hidden').slice(0, 1).slideDown();
    if($('.blogBlock .holder:hidden').length === 0) {
        $('#btnMore').fadeOut();
    }
})

/* 
    responsive menu
*/

$('.responsiveMenu').click(function() {
    $(this).next().toggleClass('navbarActive');
})