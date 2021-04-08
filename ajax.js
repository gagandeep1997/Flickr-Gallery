var page_no=1;
var item_index = 0;

var tag_name="toys";
var url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&per_page=20&page='+page_no+'&api_key=c4122618b102891a0dfef83e11bfce73&tags='+tag_name+'&format=json&nojsoncallback=1';
var total_pages=0;

async function getimages()
{
    try 
    {
        var response = await axios.get(url);        
        var pic = response.data;
        total_pages=pic.photos.pages;
        
        const gridview = document.getElementById('gridview');
        const main_slideshow = document.getElementById('main_slideshow');
        
        main_slideshow.style.display="none";
        show_gridimages()

        document.getElementById('next').addEventListener('click',function (){
            page_no++;
            url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&per_page=20&page='+page_no+'&api_key=c4122618b102891a0dfef83e11bfce73&tags='+tag_name+'&format=json&nojsoncallback=1';
            async function get_next_images(){
                response = await axios.get(url);        
                pic = response.data;
                total_pages=pic.photos.pages;
                show_gridimages()
                item_index=0;
                showdivs()
            }
            get_next_images()
        })
    
        document.getElementById('prev').addEventListener('click',function(){
            if(page_no>1)
            {
                let j=1;
                page_no--;
                url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&per_page=20&page='+page_no+'&api_key=c4122618b102891a0dfef83e11bfce73&tags='+tag_name+'&format=json&nojsoncallback=1';
                async function get_prev_images(){
                    response = await axios.get(url);        
                    pic = response.data;
                    total_pages=pic.photos.pages;
                    show_gridimages()
                    item_index=0
                    showdivs()
                }
                get_prev_images()
            }
        })
    
        document.getElementById('go').addEventListener('click',function (){
            const input_value = document.getElementById('quantity').value;
            page_no=input_value;
            url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&per_page=20&page='+page_no+'&api_key=c4122618b102891a0dfef83e11bfce73&tags='+tag_name+'&format=json&nojsoncallback=1';
            async function get_go_images(){
                response = await axios.get(url);        
                pic = response.data;
                total_pages=pic.photos.pages;
                show_gridimages()
                showdivs()
            }
            get_go_images()
        })
        function show_gridimages() 
        {
            let j=1;
            for (let i = 0; i <=19; i++) 
            {
                var img = pic.photos.photo[i];
                var imageurl = 'https://live.staticflickr.com/'+img.server+'/'+img.id+'_'+img.secret+'_'+'q'+'.jpg';
                var imageurl1 = 'https://live.staticflickr.com/'+img.server+'/'+img.id+'_'+img.secret+'_'+'z'+'.jpg';
                document.getElementById('download-image-'+j).href=imageurl1;
                const index = 'pic'+j;
                document.getElementById(index).src = imageurl;
                j++; 
            }
            document.getElementById('page_no').innerHTML='Showing page '+page_no+' of '+total_pages;
        }

        function showdivs()
        {
            var x = document.getElementsByClassName("mySlides");
            x[0].style.display = "block";
            img = pic.photos.photo[item_index];
            imageurl = 'https://live.staticflickr.com/'+img.server+'/'+img.id+'_'+img.secret+'_'+'z'+'.jpg'; 
            x[0].src = imageurl;
            document.getElementById('download-image').href = imageurl;
            let slideshow_pageno = document.getElementById('slideshow_pageno');
            slideshow_pageno.innerHTML=(((page_no-1)*20)+(item_index+1))+' of '+(20*total_pages);
            document.getElementById('caption').innerText=img.title;
        }

        function click_images() 
        {
            for(let i=1;i<=20;i++)
            {
                document.getElementById('pic'+i).addEventListener('click',function (){
                    item_index=i-1;
                    showdivs()
                    gridview.style.display = "none";
                    main_slideshow.style.display = "block";
                })
            }    
        }
        click_images()
    
        document.getElementById('showgrid').addEventListener('click',function (){
            gridview.style.display = "block";
            main_slideshow.style.display = "none";
        })
        document.getElementById('slideshow').addEventListener('click',function () {
            gridview.style.display = "none";
            main_slideshow.style.display = "block";
        })

        function showing_slideshow() 
        {
            showdivs()
            document.getElementById('next_but').addEventListener('click',function (){
                item_index += +1;
                if(item_index>=20){
                    item_index=0;
                    page_no++;
                    url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&per_page=20&page='+page_no+'&api_key=c4122618b102891a0dfef83e11bfce73&tags='+tag_name+'&format=json&nojsoncallback=1';
                    async function get_next_slidshowimages(){
                        response = await axios.get(url);        
                        pic = response.data;
                        total_pages=pic.photos.pages;
                        showdivs()
                        show_gridimages()
                    }
                    get_next_slidshowimages()
                }
                else{
                    showdivs()
                }
            })
            document.getElementById('prev_but').addEventListener('click',function (){
                if(item_index==0){
                    if(page_no!=1){
                        item_index = 19;
                        page_no--;
                        url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&per_page=20&page='+page_no+'&api_key=c4122618b102891a0dfef83e11bfce73&tags='+tag_name+'&format=json&nojsoncallback=1';
                        async function get_prev_slidshowimages(){
                            response = await axios.get(url);        
                            pic = response.data;
                            total_pages=pic.photos.pages;
                            showdivs()
                            show_gridimages()
                        }
                        get_prev_slidshowimages()
                    }
                }
                else{
                    item_index -= 1;
                    showdivs()
                }
            })  
        }

        showing_slideshow()
    }
    catch (error) 
    {
        console.log(error);
    }
}

getimages();