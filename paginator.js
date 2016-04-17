(function($){
	$.fn.extend({
		paginator : function(args){

			$(this).loadPaginator(args);
			$(this).on('click','a', function(e){				
				$(this).parents('ul').loadPaginator(args);
			});

		},

		loadPaginator : function(args){
			var totalPages = args.totalPages || 0,
				linksCount = args.linksCount || 4,
				first = args.first || 'First',
				last = args.last || 'Last',
				basePath = args.basePath || '#',
				current,
				self = this;

			if(totalPages == 0){
				return false;
			}

			setTimeout(function(){
				current =  Number(window.location.hash.replace(basePath,'') || 1);

				self.children().remove();

				if(current == 1){
					self.append('<li><span>'+ first +'</span></li>');
				}else{					
					self.append('<li><a href="'+basePath+'1">'+ first +'</a></li>');
				}

				if(current == totalPages || current >= totalPages - linksCount || current > linksCount){
					self.append('<li><span>...</span></li>');
				}

				for(var i=1; i <= totalPages; i++)	{

					if(i >= current - linksCount && i <= current || i <= linksCount + current && i > current - linksCount){
					
						if(i == current){
							self.append('<li><span>'+i+'</span></li>');	
						}else{
							self.append('<li><a href="'+basePath+i+'">'+ i +'</a></li>');									
						}

					}
				}

				if(current != totalPages || current <= totalPages - linksCount){
					self.append('<li><span>...</span></li>');
				}
				
				if(current == totalPages){
					self.append('<li><span>'+ last +'</span></li>');
				}else{					
					self.append('<li><a href="'+basePath+totalPages+'">'+ last +'</a></li>');
				}

			},10);

		}

	});
})(jQuery);