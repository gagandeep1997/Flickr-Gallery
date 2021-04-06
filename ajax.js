var page=1;
var item_index = ((page-1)*20)+1;

const tag_name="toys";
const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&per_page=500&api_key=c4122618b102891a0dfef83e11bfce73&tags='+tag_name+'&format=json&nojsoncallback=1';

async function getimages()
{
    try 
    {
        const response = await axios.get(url);        
        const pic = response.data;
        
        const gridview = document.getElementById('gridview');
        const main_slideshow = document.getElementById('main_slideshow');
        
        main_slideshow.style.display="none";
        
        let j=1;
        for (let i = (page-1)*20; i <=(page*20)-1; i++) 
        {
            const img = pic.photos.photo[i];
            const imageurl = 'https://live.staticflickr.com/'+img.server+'/'+img.id+'_'+img.secret+'_'+'q'+'.jpg';
            const imageurl1 = 'https://live.staticflickr.com/'+img.server+'/'+img.id+'_'+img.secret+'_'+'z'+'.jpg';
            document.getElementById('download-image-'+j).href=imageurl1;
            const index = 'pic'+j;
            document.getElementById(index).src = imageurl;
            j++; 
        }
        document.getElementById('page_no').innerHTML='Showing page '+page+' of 113';
    
        document.getElementById('next').addEventListener('click',function (){
            page++;
            let j=1;
            item_index = ((page-1)*20)+1;
            
            showDivs();
            
            function showDivs() 
            {
                var x = document.getElementsByClassName("mySlides");
                x[0].style.display = "block";
                let img = pic.photos.photo[item_index-1];
                let imageurl = 'https://live.staticflickr.com/'+img.server+'/'+img.id+'_'+img.secret+'_'+'z'+'.jpg'; 
                x[0].src = imageurl;
                let slideshow_pageno = document.getElementById('slideshow_pageno');
                slideshow_pageno.innerHTML=(item_index)+' of 500';
                document.getElementById('caption').innerText=img.title;
            }
            for (let i = (page-1)*20; i <=(page*20)-1; i++) 
            {
                const img = pic.photos.photo[i];
                const imageurl = 'https://live.staticflickr.com/'+img.server+'/'+img.id+'_'+img.secret+'_'+'q'+'.jpg';
                const index = 'pic'+j;
                const imageurl1 = 'https://live.staticflickr.com/'+img.server+'/'+img.id+'_'+img.secret+'_'+'z'+'.jpg';
                document.getElementById('download-image-'+j).href=imageurl1;
                document.getElementById(index).src = imageurl;   
                j++; 
            }
            document.getElementById('page_no').innerHTML='Showing page '+page+' of 113';
        })
    
        document.getElementById('prev').addEventListener('click',function(){
            if(page>1)
            {
                let j=1;
                page--;
                item_index = ((page-1)*20)+1;
                
                showDivs(item_index);
                
                function showDivs() 
                {
                    var x = document.getElementsByClassName("mySlides");
                    x[0].style.display = "block";
                    let img = pic.photos.photo[item_index-1];
                    let imageurl = 'https://live.staticflickr.com/'+img.server+'/'+img.id+'_'+img.secret+'_'+'z'+'.jpg'; 
                    x[0].src = imageurl;
                    let slideshow_pageno = document.getElementById('slideshow_pageno');
                    slideshow_pageno.innerHTML=(item_index)+' of 500';
                    document.getElementById('caption').innerText=img.title;
                }
                for (let i = (page-1)*20; i <=(page*20)-1; i++) 
                {
                    const img = pic.photos.photo[i];
                    const imageurl = 'https://live.staticflickr.com/'+img.server+'/'+img.id+'_'+img.secret+'_'+'q'+'.jpg';
                    const index = 'pic'+j;
                    document.getElementById(index).src = imageurl;
                    const imageurl1 = 'https://live.staticflickr.com/'+img.server+'/'+img.id+'_'+img.secret+'_'+'z'+'.jpg';
                    document.getElementById('download-image-'+j).href=imageurl1;
                    j++; 
                }
                document.getElementById('page_no').innerHTML='Showing page '+page+' of 113';
            }
        })
    
        document.getElementById('go').addEventListener('click',function (){
            const input_value = document.getElementById('quantity').value;
            
            let j=1;
            page=input_value;
            item_index = ((page-1)*20)+1;
            
            showDivs(item_index)
            
            function showDivs() 
            {
                var x = document.getElementsByClassName("mySlides");
                x[0].style.display = "block";
                let img = pic.photos.photo[item_index-1];
                let imageurl = 'https://live.staticflickr.com/'+img.server+'/'+img.id+'_'+img.secret+'_'+'z'+'.jpg'; 
                x[0].src = imageurl;
                let slideshow_pageno = document.getElementById('slideshow_pageno');
                slideshow_pageno.innerHTML=(item_index)+' of 500';
                document.getElementById('caption').innerText=img.title;
            }
            for (let i = (page-1)*20; i <=(page*20)-1; i++) 
            {
                const img = pic.photos.photo[i];
                const imageurl = 'https://live.staticflickr.com/'+img.server+'/'+img.id+'_'+img.secret+'_'+'q'+'.jpg';
                const index = 'pic'+j;
                document.getElementById(index).src = imageurl;   
                j++; 
                const imageurl1 = 'https://live.staticflickr.com/'+img.server+'/'+img.id+'_'+img.secret+'_'+'z'+'.jpg';
                document.getElementById('download-image-'+j).href=imageurl1;
            }
            document.getElementById('page_no').innerHTML='Showing page '+page+' of 113';
        })
    
        document.getElementById('showgrid').addEventListener('click',function (){
            gridview.style.display = "block";
            main_slideshow.style.display = "none";
        })

        document.getElementById('slideshow').addEventListener('click',function () {
            gridview.style.display = "none";
            main_slideshow.style.display = "block";
        })

        item_index = ((page-1)*20)+1;

        function showing_slideshow() 
        {
            showDivs();
    
            document.getElementById('prev_but').addEventListener('click',function (){
                if(item_index>1){
                    item_index += -1;
                    if(item_index<=(page-1)*20)
                    {
                        let j=1;
                        page--;
                        for (let i = (page-1)*20; i <=(page*20)-1; i++) 
                        {
                            const img = pic.photos.photo[i];
                            const imageurl = 'https://live.staticflickr.com/'+img.server+'/'+img.id+'_'+img.secret+'_'+'c'+'.jpg';
                            const index = 'pic'+j;
                            document.getElementById(index).src = imageurl;   
                            j++; 
                        }
                        document.getElementById('page_no').innerHTML='Showing page '+page+' of 113';
                    }
                    showDivs();
                }
            })
            
            document.getElementById('next_but').addEventListener('click',function (){
                item_index += +1;
                if(item_index>=((page*20)+1))
                {
                    let j=1;
                    page++;
                    for (let i = (page-1)*20; i <=(page*20)-1; i++) 
                    {
                        const img = pic.photos.photo[i];
                        const imageurl = 'https://live.staticflickr.com/'+img.server+'/'+img.id+'_'+img.secret+'_'+'c'+'.jpg';
                        const index = 'pic'+j;
                        document.getElementById(index).src = imageurl;   
                        j++; 
                    }
                    document.getElementById('page_no').innerHTML='Showing page '+page+' of 113';   
                }
                showDivs();
            })
    
            function showDivs() 
            {
                var x = document.getElementsByClassName("mySlides");
                x[0].style.display = "block";
                let img = pic.photos.photo[item_index-1];
                let imageurl = 'https://live.staticflickr.com/'+img.server+'/'+img.id+'_'+img.secret+'_'+'z'+'.jpg'; 
                x[0].src = imageurl;
                document.getElementById('download-image').href = imageurl;
                let slideshow_pageno = document.getElementById('slideshow_pageno');
                slideshow_pageno.innerHTML=(item_index)+' of 500';
                document.getElementById('caption').innerText=img.title;
            }   
        }

        showing_slideshow()

        for(let i=1;i<=20;i++)
        {
            document.getElementById('pic'+i).addEventListener('click',function (){
                item_index=((page-1)*20)+i;
                var x = document.getElementsByClassName("mySlides");
                let img = pic.photos.photo[item_index-1];
                let imageurl = 'https://live.staticflickr.com/'+img.server+'/'+img.id+'_'+img.secret+'_'+'z'+'.jpg';
                x[0].src = imageurl;
                gridview.style.display = "none";
                main_slideshow.style.display = "block";
                let slideshow_pageno = document.getElementById('slideshow_pageno');
                slideshow_pageno.innerHTML=(item_index)+' of 500';
                document.getElementById('caption').innerText=img.title;
            })
        }
    }
    catch (error) 
    {
        console.log(error);
    }
}

getimages();