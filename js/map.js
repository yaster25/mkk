$(document).ready(function(){
  if($('#map').length){
        
        var active=[];
        
        $('.list-map__item').each(function(){
            if($(this).hasClass('active')){
                var i=$(this).attr('data-address');
                active[i]='-active';
            }
            else{
                var i=$(this).attr('data-address');
                active[i]='';
            }
        })
        
        console.log(active);
        
        schools = [{
          city: 'Москва',
          coord: [55.642194, 37.484065],
          style: "islands#redIcon",
          filials: [{              
              filial: 'Москва, ул. Академика Бакулева, 10',
              coord: [55.642194, 37.484065],
              id:0,
              active: active[0] 
            },
            {
              filial: 'Москва, Ленинский проспект, 131',
              coord: [55.644145, 37.473492],
                id:1,
              active: active[1] 
            },
            {
              filial: 'Москва, ул. Академика Арцимовича, 17',
              coord: [55.637769, 37.511311],
                id:2,
              active: active[2] 
            },
            {
              filial: 'Москва, Мичуринский проспект, 44А',
              coord: [55.694673, 37.491950],
                id:3,
              active: active[3] 
            },
            {
              filial: 'Санкт-Петербург, Садовая улица, 46',
              coord: [59.925227, 30.314700],
                id:4,
              active: active[4] 
            }
          ]
        }];

        ymaps.ready(init);

        function init() {

          myMap = new ymaps.Map('map', {
            center: schools[0].coord,
            zoom: 16,
            controls: ['zoomControl']
          });

          for (var i = 0, l = schools.length; i < l; i++) {
            createMenuGroup(schools[i]);
          }

          function createMenuGroup(group) {
            collection = new ymaps.GeoObjectCollection(null, {
              preset: group.style
            });
            myMap.geoObjects.add(collection);
            for (var j = 0, m = group.filials.length; j < m; j++) {
              createSubMenu(group.filials[j], collection);
            }
          }
        
          function createSubMenu(item, collection) {             
             
              if(item.active==''){
                placemark = new ymaps.Placemark(item.coord, {
                    id:item.id
                },{
                    iconLayout: 'default#image',
                    iconImageHref: 'img/icon-marker'+item.active+'.svg',
                    iconImageSize: [68, 68],
                    iconImageOffset: [-28, -87]
                });   
              }
              else{
                  placemark = new ymaps.Placemark(item.coord, {
                    id:item.id
                },{
                    iconLayout: 'default#image',
                    iconImageHref: 'img/icon-marker'+item.active+'.svg',
                    iconImageSize: [105, 105],
                    iconImageOffset: [-28, -87]
                }); 
              }
              placemark.events
                .add('click', function (e) {
                    id=e.get('target').properties.get('id');
                    $('.list-map__item[data-address="'+id+'"] .list-map__link').click(); 
                });
              
            collection.add(placemark);
          } 
       ///myMap.setBounds(collection.getBounds(), {checkZoomRange:true, zoomMargin:60});
        }
    

        $('.list-map__link').click(function(event) {
            $('.list-map__item').removeClass('active');
            $(this).parents('.list-map__item').addClass('active');
            $('.map-tab').removeClass('active');            
                        
            var i=$(this).parents('.list-map__item').attr('data-address');
            $('.map-tab[data-address="'+i+'"]').addClass('active');            
            			 		 
                $('html, body').animate({
                  scrollTop: $('#map').offset().top		
                }, 1500);	            
            
             // glFilial = $(this).parents('.list-map__item').index();
              glFilial = i;
              event.preventDefault();             
              myMap.setCenter(schools[0].filials[glFilial].coord, 16);        
           
              myMap.geoObjects.removeAll();
            
            for (var j = 0, m = schools[0].filials.length; j < m; j++) {
                if(j==glFilial)
                 schools[0].filials[j].active='-active';
                 else schools[0].filials[j].active='';                
            }
            
            for (var i = 0, l = schools.length; i < l; i++) {
            createMenuGroup(schools[i]);
          }

            function createMenuGroup(group) {
            collection = new ymaps.GeoObjectCollection(null, {
              preset: group.style
            });
            myMap.geoObjects.add(collection);
            for (var j = 0, m = group.filials.length; j < m; j++) {
              createSubMenu(group.filials[j], collection);
            }
          }

            function createSubMenu(item, collection) {
            if(item.active==''){
                placemark = new ymaps.Placemark(item.coord, {
                    id:item.id
                },{
                    iconLayout: 'default#image',
                    iconImageHref: 'img/icon-marker'+item.active+'.svg',
                    iconImageSize: [68, 68],
                    iconImageOffset: [-28, -87]
                });   
              }
              else{
                  placemark = new ymaps.Placemark(item.coord, {
                    id:item.id
                },{
                    iconLayout: 'default#image',
                    iconImageHref: 'img/icon-marker'+item.active+'.svg',
                    iconImageSize: [105, 105],
                    iconImageOffset: [-28, -87]
                }); 
              }
                
            placemark.events.add('click', function (e) {
                    id=e.get('target').properties.get('id');                  
                    $('.list-map__item[data-address="'+id+'"] .list-map__link').click();                  
                });
            collection.add(placemark);
          }
            // myMap.setBounds(collection.getBounds(), {checkZoomRange:true});

        });
    }
 });
