$(window).on('load', function () {
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		$('body').addClass('ios');
	} else{
		$('body').addClass('web');
	};
 
});

'use strict';

;( function ( document, window, index )
{
	var inputs = document.querySelectorAll( '.inputfile' );
	Array.prototype.forEach.call( inputs, function( input )
	{
		var label	 = input.nextElementSibling,
			labelVal = label.innerHTML;

		input.addEventListener( 'change', function( e )
		{
			var fileName = '';
			if( this.files && this.files.length > 1 )
				fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
			else
				fileName = e.target.value.split( '\\' ).pop();

			if( fileName )
				label.querySelector( 'span' ).innerHTML = fileName;
			else
				label.innerHTML = labelVal;
		});

		// Firefox bug fix
		input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
		input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
	});
}( document, window, 0 ));


$(document).ready(function(){
    
    
    $('.nav-item_parent .nav-item__link').hover(function() {
        var this_nav='';
        this_nav=$(this).parent('.nav-item_parent').find('.subnav-w').html();
        $('.subnav-wrapper .wrapper').html('');
        $('.subnav-wrapper .wrapper').html(this_nav);
        $('.subnav-wrapper').stop().slideDown();
            $(this).parent('.nav-item_parent').addClass('hover');      
            return false;
        },  function() {
          var hovered = $(".subnav-wrapper:hover").length;
            if(hovered){
            }else{
                if($(".nav-item_parent:hover").length){
                    
                }
                else{
                    $('.subnav-wrapper').stop().slideUp();
                $('.nav-item_parent').removeClass('hover');
                }
                
            }        
         return false;
    });
     
     $('.subnav-wrapper').hover(function() {
     },  function() {   
          $('.subnav-wrapper').stop().slideUp();
          $('.nav-item_parent').removeClass('hover');
         return false;
    });
    
    $(".js-aside-menu").click(function(){    
         $('#fixed-panel').addClass('active');
         $('body').addClass('menu-open');        
        return false;
    });  
     
     $('.fixed-panel__close').click(function(){    
         $('#fixed-panel').removeClass('active');
         $('body').removeClass('menu-open');        
        return false;
     });
    
    $(document).bind("click touchstart",function(event) {
        if ($(event.target).closest(".fixed-panel").length) return;
        $('.fixed-panel').removeClass('active');
        $('body').removeClass('menu-open');        

        event.stopPropagation();
      });
    
    $('.sidebar-nav-item__trigger').click(function(){         
         $(this).parents('.sidebar-nav-item').toggleClass('active');
         $(this).parents('.sidebar-nav-item').find('.sidebar-subnav').slideToggle();    
        return false;
     });
    
    
    
    $('.js-top-slider').on('init', function(event, slick){
        $('.top-slider-nav__slide').removeClass('active');
        $('.top-slider-nav__slide[data-slide="00"]').addClass('active');
    });
    
    $('.js-top-slider').slick({
        infinite:true, 
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        autoplay:true,
        appendArrows:$('.top-slider-arrows .wrapper'),
    });

    $('.top-slider-nav__slide').on('click', function(){
         var ds=$(this).attr('data-slide');
         $('.js-top-slider').slick('slickGoTo', ds);
         $('.top-slider-nav__slide').removeClass('active');
         $(this).addClass('active');
         return false;
    });
    
     $('.js-top-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $('.top-slider-nav__slide').removeClass('active');
        $('.top-slider-nav__slide[data-slide="0'+nextSlide+'"]').addClass('active');
    }); 
    
    $('.tf-tabs-list li').click(function(){
		var tab_id = $(this).attr('data-tab');
		$('.tf-tabs-list li').removeClass('active');
		$(this).parents('.tf-tabs-wrapper').find('.tf-tab').removeClass('active');

		$(this).addClass('active');
		$("#"+tab_id).addClass('active');
	})
    
    if($('#range-1').length){
        var stepSlider = document.getElementById('range-1');
        noUiSlider.create(stepSlider, {
            start: [8000],
            step: 100,
            connect: 'lower',
            range: {
                'min': [1000],
                //'50%': [1000, 10],
                'max': [15000]
            },
            pips: {
                mode: 'values',
                values: [1000, 15000],
                density: 1000,
                format: wNumb({
                    suffix: ' ₽'
                })
            }
        });
        
        var Format_tt = wNumb({
                thousand: ' '
            });
       
       var stepSliderValueElement = document.getElementById('range-1-value');
        stepSlider.noUiSlider.on('update', function (values, handle) {
            var Format = wNumb({
                thousand: ' '
            });
            stepSliderValueElement.value =  parseInt(values[handle]) ;
            $('#tf-summ').text(Format_tt.to ( $('#range-1-value').val() * 1 ));
            
            var percent=parseFloat($('#tf-percent').text());        
            var total=parseFloat(parseInt($('#range-1-value').val())*percent/100) + parseInt($('#range-1-value').val());
            $('#tf-total').text(total);
            
        });
        
        stepSliderValueElement.addEventListener('change', function(){
            stepSlider.noUiSlider.set([this.value, null]);
            $('#tf-summ').text(Format_tt.to ( $('#range-1-value').val() * 1 ))
            
            var percent=parseFloat($('#tf-percent').text());        
            var total=parseFloat(parseInt($('#range-1-value').val())*percent/100) + parseInt($('#range-1-value').val());
            $('#tf-total').text(total);
        });
   }
    
    if($('#range-2').length){
        var stepSlider2 = document.getElementById('range-2');
        noUiSlider.create(stepSlider2, {
            start: [10],
            step: 1,
            connect: 'lower',
            range: {
                'min': [2],
                'max': [15]
            },
            pips: {
                mode: 'values',
                values: [2, 15],
                density: 1000,
                format: wNumb({
                    suffix: ' дн.'
                })
            }
        });
       
       var stepSliderValueElement2 = document.getElementById('range-2-value');
        stepSlider2.noUiSlider.on('update', function (values, handle) {
            var Format = wNumb({
                thousand: ' '
            });
            stepSliderValueElement2.value =  parseInt(values[handle]) ;
            var date = new Date();
            date.setDate(date.getDate() + parseInt($('#range-2-value').val()));
            var yyyy = date.getFullYear().toString();
            var mm = (date.getMonth()+1).toString(); // getMonth() is zero-based
            var dd  = date.getDate().toString();
            var newd=(dd[1]?dd:"0"+dd[0]) +'.'+ (mm[1]?mm:"0"+mm[0]) +'.'+yyyy;
            $('#tf-date').text(newd);
        });
        
        stepSliderValueElement2.addEventListener('change', function(){
            stepSlider2.noUiSlider.set([this.value, null]);
            var date = new Date();
            date.setDate(date.getDate() + parseInt($('#range-2-value').val()));
            var yyyy = date.getFullYear().toString();
            var mm = (date.getMonth()+1).toString(); // getMonth() is zero-based
            var dd  = date.getDate().toString();
            var newd=(dd[1]?dd:"0"+dd[0]) +'.'+ (mm[1]?mm:"0"+mm[0]) +'.'+yyyy;
           $('#tf-date').text(newd);
        });
        
        
   }
    
    if($('#timer').length){
          var counter = 30;
        
          setInterval(function() {
            counter--;
            if (counter >= 0) {
              span = document.getElementById("timer");
                cc=counter;
                if(counter<10){
                    cc='0'+counter;
                }
              span.innerHTML = '00:' + cc;
            }
            // Display 'counter' wherever you want to display it.
            if (counter === 0) {
            //    alert('this is where it happens');
                clearInterval(counter);
            }

          }, 1000);
        
   }
    
    
    if($('#range-3').length){
        var stepSlider3 = document.getElementById('range-3');
        noUiSlider.create(stepSlider3, {
            start: [100000],
            step: 100,
            connect: 'lower',
            range: {
                'min': [15000],
                //'50%': [1000, 10],
                'max': [150000]
            },
            pips: {
                mode: 'values',
                values: [15000, 150000],
                density: 1000,
                format: wNumb({
                    suffix: ' ₽'
                })
            }
        });
        
        var Format_tt = wNumb({
                thousand: ' '
            });
       
       var stepSliderValueElement3 = document.getElementById('range-3-value');
        stepSlider3.noUiSlider.on('update', function (values, handle) {
            var Format = wNumb({
                thousand: ' '
            });
            stepSliderValueElement3.value =  parseInt(values[handle]) ;
            $('#tf-summ-2').text(Format_tt.to ( $('#range-3-value').val() * 1 ));
            
            var percent2=parseFloat($('#tf-percent-2').text());        
            var total2=parseFloat(parseInt($('#range-3-value').val())*percent2/100) + parseInt($('#range-3-value').val());
            $('#tf-total-2').text(total2);
            
        });
        
        stepSliderValueElement3.addEventListener('change', function(){
            stepSlider3.noUiSlider.set([this.value, null]);
            $('#tf-summ-2').text(Format_tt.to ( $('#range-3-value').val() * 1 ))
            
            var percent2=parseFloat($('#tf-percent-2').text());        
            var total2=parseFloat(parseInt($('#range-3-value').val())*percent2/100) + parseInt($('#range-3-value').val());
            $('#tf-total-2').text(total);
        });
   }
    
    if($('#range-4').length){
        var stepSlider4 = document.getElementById('range-4');
        noUiSlider.create(stepSlider4, {
            start: [6],
            step: 1,
            connect: 'lower',
            range: {
                'min': [1],
                'max': [12]
            },
            pips: {
                mode: 'values',
                values: [1, 12],
                density: 1000,
                format: wNumb({
                    suffix: ' мес.'
                })
            }
        });
       
       var stepSliderValueElement4 = document.getElementById('range-4-value');
        stepSlider4.noUiSlider.on('update', function (values, handle) {
            var Format = wNumb({
                thousand: ' '
            });
            stepSliderValueElement4.value =  parseInt(values[handle]) ;
            var date = new Date();
            date.setMonth(date.getMonth() + parseInt($('#range-4-value').val()));
            var yyyy = date.getFullYear().toString();
            var mm = (date.getMonth()+1).toString(); // getMonth() is zero-based
            var dd  = date.getDate().toString();
            var newd=(dd[1]?dd:"0"+dd[0]) +'.'+ (mm[1]?mm:"0"+mm[0]) +'.'+yyyy;
            $('#tf-date-2').text(newd);
        });
        
        stepSliderValueElement4.addEventListener('change', function(){
            stepSlider4.noUiSlider.set([this.value, null]);
            var date = new Date();
            date.setMonth(date.getMonth() + parseInt($('#range-4-value').val()));
            var yyyy = date.getFullYear().toString();
            var mm = (date.getMonth()+1).toString(); // getMonth() is zero-based
            var dd  = date.getDate().toString();
            var newd=(dd[1]?dd:"0"+dd[0]) +'.'+ (mm[1]?mm:"0"+mm[0]) +'.'+yyyy;
           $('#tf-date-2').text(newd);
        });
        
        
   }
    
    if($('#timer-2').length){
        var counter2 = 30;
        setInterval(function() {
            counter2--;
            if (counter2 >= 0) {
              span2 = document.getElementById("timer-2");
                cc2=counter2;
                if(counter2<10){
                    cc2='0'+counter2;
                }
              span2.innerHTML = '00:' + cc2;
            }
            // Display 'counter' wherever you want to display it.
            if (counter2 === 0) {
            //    alert('this is where it happens');
                clearInterval(counter2);
            }

          }, 1000);
    }
    
    $.mask.definitions['9'] = false;
    $.mask.definitions['q'] = "[0-9]";
    $(".input-phone").mask("+7 495 qqq-qq-qq", {placeholder:"_"});
    
    $('.input-phone').focus(function() {   
        $(this).parents('.form__input-mask').addClass('filled');
     }).blur(function() {  
        if($(this).val().length==0)
        $(this).parents('.form__input-mask').removeClass('filled');
     }) 
    
    $('.form-order').each(function() {  
        $(this).validate({       
             errorElement:'div',
             errorPlacement: function(error, element) {
                element.parent().append(error);
            },
                rules: {
                    phone: "required"                				
                },
                messages: {
                    phone: "Необходимо заполнить «Телефон»."							
                },
                submitHandler: function(form){
                    $.fancybox.close();
                    $.fancybox.open({
                        src  : '#popup-order-thank',
                        type : 'inline',
                         touch: false,

                    });
                }
         });
    });
    
    $('.js-slider-target').each(function () {
          $(this).slick({
            infinite: true,
            arrows:true,
            dots:false,
            slidesToShow:3,
            slidesToScroll: 1,
            appendArrows: $(this).parents('.slider-wrapper').find('.slider-arrows'),
            swipeToSlide:true,
            centerMode:false,
            fade:false,
            responsive: [   
                 {
                  breakpoint: 992,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  }
                },
                {
                  breakpoint: 741,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  }
                }
              ]
        });
    });
    
    $('.tabs-list__item').click(function(){
		var tab_id = $(this).attr('data-tab');
		$(this).parents('.tabs-wrapper').find('.tabs-list__item').removeClass('active');
		$(this).parents('.tabs-wrapper').find('.tab').removeClass('active');

		$(this).addClass('active');
		$("#"+tab_id).addClass('active');
        
        if($('.js-i-list').length){
            $('.js-i-list').slick('setPosition', 0);
        }
        if($('.js-i-list-2').length){
            $('.js-i-list-2').slick('setPosition', 0);
        }
        if($('.js-i-list-3').length){
            $('.js-i-list-3').slick('setPosition', 0);
        }
        
	})
    
    $('.i-list-item').hover(function() {
       $(this).prevAll('.i-list-item').addClass('hover');
        $(this).addClass('hover');
        }, function() {

         $('.i-list-item').removeClass('hover');
         return false;
    });
    
     $('.js-slider-reviews').each(function () {
          $(this).slick({
            infinite: true,
            arrows:true,
            dots:false,
            slidesToShow:1,
            slidesToScroll: 1,
            appendArrows: $(this).parents('.slider-wrapper').find('.slider-arrows'),
            swipeToSlide:true,
            centerMode:false,
            fade:true,
            responsive: [   
                {
                  breakpoint: 741,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  }
                }
              ]
        });
    });
    
    
    var $i_slider = $('.js-i-list');
    var i_slider_settings = {
        infinite: true,
        arrows:false,
        dots:false,        
        slidesToShow:1,
        slidesToScroll: 1, 
        responsive: [
            {
                breakpoint: 9999,
                settings:"unslick" 
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow:1,
                    slidesToScroll: 1, 
                    fade:true,
                }
            }
        ]
    };
    $i_slider.slick(i_slider_settings);
    $(window).on('resize', function() {
      if (!$i_slider.hasClass('slick-initialized')) {
        return $i_slider.slick(i_slider_settings);
      }
    });
    
    $('.js-i-list').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $('.js-i-list-nav .i-list-nav__slide').removeClass('active');
        $('.js-i-list-nav .i-list-nav__slide[data-slide="0'+nextSlide+'"]').addClass('active');
        $('.js-i-list-nav .i-list-nav__slide[data-slide="0'+nextSlide+'"]').prevAll('.i-list-nav__slide').addClass('active');
    }); 
    
    $('.js-i-list-nav  .i-list-nav__slide').on('click', function(){
         var ds=$(this).attr('data-slide');
         $('.js-i-list').slick('slickGoTo', ds);
         $('.js-i-list-nav .i-list-nav__slide').removeClass('active');
        $(this).prevAll('.i-list-nav__slide').addClass('active');
         $(this).addClass('active');
         return false;
    });
    
    //js-i-list-2
    var $i2_slider = $('.js-i-list-2');
    var i2_slider_settings = {
        infinite: true,
        arrows:false,
        dots:false,        
        slidesToShow:1,
        slidesToScroll: 1, 
        responsive: [
            {
                breakpoint: 9999,
                settings:"unslick" 
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow:1,
                    slidesToScroll: 1, 
                    fade:true,
                }
            }
        ]
    };
    $i2_slider.slick(i2_slider_settings);
    $(window).on('resize', function() {
      if (!$i2_slider.hasClass('slick-initialized')) {
        return $i2_slider.slick(i2_slider_settings);
      }
    });
    
    $('.js-i-list-2').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $('.js-i-list-nav-2 .i-list-nav__slide').removeClass('active');
        $('.js-i-list-nav-2 .i-list-nav__slide[data-slide="0'+nextSlide+'"]').addClass('active');
        $('.js-i-list-nav-2 .i-list-nav__slide[data-slide="0'+nextSlide+'"]').prevAll('.i-list-nav__slide').addClass('active');
    }); 
    
    $('.js-i-list-nav-2  .i-list-nav__slide').on('click', function(){
         var ds=$(this).attr('data-slide');
         $('.js-i-list-2').slick('slickGoTo', ds);
         $('.js-i-list-nav-2 .i-list-nav__slide').removeClass('active');
        $(this).prevAll('.i-list-nav__slide').addClass('active');
         $(this).addClass('active');
         return false;
    });
    
    //js-i-list-3
    var $i3_slider = $('.js-i-list-3');
    var i3_slider_settings = {
        infinite: true,
        arrows:false,
        dots:false,        
        slidesToShow:1,
        slidesToScroll: 1, 
        responsive: [
            {
                breakpoint: 9999,
                settings:"unslick" 
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow:1,
                    slidesToScroll: 1, 
                    fade:true,
                }
            }
        ]
    };
    $i3_slider.slick(i3_slider_settings);
    $(window).on('resize', function() {
      if (!$i3_slider.hasClass('slick-initialized')) {
        return $i3_slider.slick(i3_slider_settings);
      }
    });
    
    $('.js-i-list-3').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $('.js-i-list-nav-3 .i-list-nav__slide').removeClass('active');
        $('.js-i-list-nav-3 .i-list-nav__slide[data-slide="0'+nextSlide+'"]').addClass('active');
        $('.js-i-list-nav-3 .i-list-nav__slide[data-slide="0'+nextSlide+'"]').prevAll('.i-list-nav__slide').addClass('active');
    }); 
    
    $('.js-i-list-nav-3  .i-list-nav__slide').on('click', function(){
         var ds=$(this).attr('data-slide');
         $('.js-i-list-3').slick('slickGoTo', ds);
         $('.js-i-list-nav-3 .i-list-nav__slide').removeClass('active');
        $(this).prevAll('.i-list-nav__slide').addClass('active');
         $(this).addClass('active');
         return false;
    });
    
    
    $('.block-tags-tabs li').on('click', function(){
         var id=$(this).attr('data-id');        
         $('.block-tags-tabs li').removeClass('active');
         $(this).addClass('active');
        if(id>0){
            $(this).parents('.block-tags').find('.tag').hide().addClass('hide');
            $(this).parents('.block-tags').find('.tag-'+id).show().removeClass('hide');
        }else{
            $(this).parents('.block-tags').find('.tag').show().removeClass('hide');
        }
        
         return false;
    });
    
    
    $('.footer-nav__trigger').click(function(){         
         $(this).parents('.footer-nav').toggleClass('active');
         $(this).parents('.footer-nav').find('.footer-nav__content').slideToggle();    
        return false;
     });
    
    
    $("#form-callback").validate({
         errorElement:'div',
         errorPlacement: function(error, element) {
            element.parent().append(error);
        },
			rules: {
                name: "required",
				phone: "required",
				email: {
					required: true,
					email: true
				}
			},
			messages: {
                name: "Необходимо заполнить «Имя».",
				phone: "Необходимо заполнить «Телефон».",
				email: {
                    required: "Необходимо заполнить «E-mail».",
					email: "Введите корректный E-mail."
                }								
			},
            submitHandler: function(){
                $.fancybox.close();
                $.fancybox.open({
                    src  : '#popup-callback-thank',
                    type : 'inline',
                     touch: false,
                    
                });
            }
     });    
    
    $('[data-fancybox]').fancybox({
        touch: false,
        closeExisting: true,
        autoFocus: false,
        afterShow : function( instance, current ) {
            
        }
    });
    
    if($('.input-date').length){
        $('.input-date').datepicker({
            maxDate: new Date() // Now can select only dates, which goes after today
        })
    }
   
   if($('.input-preview').length){    
        $('.input-preview').jPreview();
   }
    
 });
