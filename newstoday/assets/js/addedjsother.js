

//function for autoscroll to news results once searched

function scrollwindow(){
  window.scrollBy(0,600)
}
function scrollwindowlink(){
  window.scroll(0,500);

}

// function for storing user's selected categories in the array, selectedinputs. Returns this array containing the user's selected categories in search.
                function boxchecked(){
                var selectedinputs=[];
                var inputs=document.getElementsByName('topic');
                //loop to iterate over inputs to store checked inputs in the selectedinputs array.
                for (var checkindex=0; checkindex<inputs.length; checkindex++){
                  if (inputs[checkindex].type=='checkbox' && inputs[checkindex].checked==true){
                    selectedinputs.push(inputs[checkindex].value);
                  }
                  //if category is not checked, store as " " in selectedinputs array.
                  else {
                    selectedinputs.push("");
                  }

                }
                // console.log(selectedinputs);
                return selectedinputs;
                }

// function for clearing previous content from the container if the user had clicked on the category links.
                function clearpreviouslinkcontent(){
                  document.getElementsByClassName("card-body").innerHTML="";
                }

//function for hiding the next page and previous page buttons on the headline news on the home page.
                function hidepagebuttons(){
                    document.getElementById("nextlink").style.display="none";
                    document.getElementById("previouslink").style.display="none";
                }


// function for loading news from the category box with links on the left
                function loadlinknews(categoryinput){
  // functions called to clear all previous content in the container.
                  clearhome();
                  clearcontainer();
                  clearpreviouslinkcontent();
                  hidepagebuttons();

                   var linebreak=document.createElement("BR");
                   document.getElementById("home").append(linebreak);
                   document.getElementById("home").append(linebreak);
                   document.getElementById("home").append(linebreak);


// API Request based on which category link the user selected
               var urlfirsthalf="https://newsapi.org/v2/top-headlines?";
               var urlsecondhalf="category=" +categoryinput+ "&apiKey=bc6ba5c090bc4fe492f395b955f50e0f";
               //var url=urlfirsthalf+urlsecondhalf;
               // console.log("url"+url);
               var title;
                  
                 const proxyUrl = "https://cors-anywhere.herokuapp.com/"
const qInTitle = "phone";
const from = "2021-06-15";
const apiKey = "bc6ba5c090bc4fe492f395b955f50e0";
const url = `${proxyUrl}https://newsapi.org/v2/everything?qInTitle=${qInTitle}&from=${from}language=en&apiKey=${apiKey}`;
const request = new Request(url);

fetch(request)
  .then(response => response.json())
  .then((news) => {
    console.log(news);
  })
  .catch(error => {
    console.log(error);
  });
//                var Request=new XMLHttpRequest();
//                Request.open('GET',url, false);
//                Request.send();


               if(Request.readyState!=4 ||  Request.status!= 200 || Request.responseText===""){
               window.console.error("Request had an error");
               var error=document.createElement('H3');
               error.innerHTML="API error."
               document.getElementById("home").appendchild(error);
               return;
               }
               var information=JSON.parse(Request.responseText);
               // console.log(information);
               // console.log(information.articles.length +"length");
               //loop to iterate through articles in information object, and store title, article link, image, description and date respectively for each article.
               for (var infoindex=0;infoindex<12;infoindex++){
                 var title= " " +information.articles[infoindex].title;
                 // console.log(information.articles[infoindex].title +"titles");
                 var urlink=information.articles[infoindex].url;
                 var img=information.articles[infoindex].urlToImage;
                 var description = information.articles[infoindex].description;

                 var date=information.articles[infoindex].publishedAt;
                 var source=information.articles[infoindex].source.name;
                 // console.log(source+"source");
                 //
                 // console.log(title);
                 // console.log(urlink);
                 // console.log(description+"description");

                 //create HTML elements for displaying news feed
                 var image=document.createElement('img');
                 var paraspace=document.createElement("P");
                 var link=document.createElement('a');
                 var descriptionparagraph=document.createElement("P");
                 var dateparagraph=document.createElement("P");

                 var sourceparagraph=document.createElement("P");
                 //check if source is null
                 if (source==null || source==""){
                   source="No source available";
                   // console.log(source);
                 }



                 //alternate image if image is null
                 if(img==null){
                   image.setAttribute("src","https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482930.jpg");
                   image.setAttribute("width","100px");
                   image.setAttribute("height","100px");
                   image.setAttribute("alt","image");
                   image.style.float = 'left';
                   image.style.clear = 'both';
                   image.style.display = 'block';
                   image.style.padding = '10px';

                   image.setAttribute("padding-right","10px");
                 }
                 //if image is not null, set src, width, height, etc. Also, check if image has an error and call imageerror function.
                 else{
                 image.setAttribute("src",img);
                 image.setAttribute("width","100px");
                 image.setAttribute("height","100px");
                 image.setAttribute("alt","image");
                 image.setAttribute("onerror","imagerror(this)");
                 image.style.float = 'left';
                 image.style.clear = 'both';
                 image.style.display = 'block';
                 image.style.padding = '10px';

                 image.setAttribute("padding-right","10px");

           }

//Setting link to each article based on news feed that API returned.
                 link.setAttribute('href',urlink);

                 link.setAttribute("style", "background-color:none;font-family: Arial; color:black; font-size:15px; font-weight:bold; text-decoration:underline;text-align:center;");



                 link.innerHTML=" " +title;
                 paraspace.innerHTML="";

                 //check if description is null and store alternate message.
                 if (description==null||description==""){
                   descriptionparagraph.innerHTML="No description available";
                   descriptionparagraph.setAttribute("style","font-family:Arial; color:black;font-size:12px; margin-bottom:30px;")
                 }
                 else{
                 descriptionparagraph.innerHTML=description;

                 descriptionparagraph.setAttribute("style","font-family:Arial; color:black;font-size:12px; margin-bottom:30px;");
               }
               //check if date is null and store alternate date.
               if (date==null||date==""){
                 dateparagraph.innerHTML="No publish date available";
                 dateparagraph.setAttribute("style", "font-family:Verdana; color:darkblue; font-size:10px; font-weight:bold;");

               }
               else{
                 dateparagraph.innerHTML="Published at: " +date + "," + " "+ "Source: " + source;
                 dateparagraph.setAttribute("style", "font-family:Verdana; color:darkblue; font-size:10px; font-weight:bold;");
               }



               var paragraphtomixcolor = dateparagraph;
               var str = paragraphtomixcolor.innerHTML;
               var oldText="";
               var newText = "";
               var indexofsource= str.indexOf("Source")
               oldText+=str.substring(0,indexofsource).fontcolor("blue");
               newText+=str.substring(indexofsource, str.length).fontcolor("purple");
               paragraphtomixcolor.innerHTML = oldText+newText;

//append elements to div "home"
                 document.getElementById("home").appendChild(paraspace);
                 document.getElementById("home").appendChild(image);
                 document.getElementById("home").appendChild(link);
                 document.getElementById("home").appendChild(dateparagraph);
                 document.getElementById("home").appendChild(paraspace);
                 document.getElementById("home").appendChild(descriptionparagraph);




               }


}



//function for loading initial news feed once page loads.

function loadhomenews(input){



       var linespace=document.createElement('BR');

       //heading for entertainment, sports, and technology categories that news is sorted by.
       var heading=document.createElement('H3');


       heading.innerHTML=input;
       heading.setAttribute("style", "border-radius:5px;overflow:hidden;background:#dbedef; padding:4px; width:141px; height:36px;text-align:center;border-style:solid;clear:both");
       document.getElementById("home").appendChild(linespace);
       document.getElementById("home").appendChild(heading);
       document.getElementById("home").appendChild(linespace);


    var urlfirsthalf="https://newsapi.org/v2/top-headlines?";
    var urlsecondhalf="category=" +input+ "&apiKey=bc6ba5c090bc4fe492f395b955f50e0f";
    var url=urlfirsthalf+urlsecondhalf;
    // console.log("url"+url);
    var title;
//API Request
    var Request=new XMLHttpRequest();
    Request.open('GET',url, false);
    Request.send();


    if(Request.readyState!=4 ||  Request.status!= 200 || Request.responseText===""){
    window.console.error("Request had an error");
    var error=document.createElement('H3');
    error.innerHTML="API error."
    document.getElementById("home").appendchild(error);
    return;
    }
    var information=JSON.parse(Request.responseText);
    // console.log(information);
    // console.log(information.articles.length +"length");
    //loop to iterate through json object and store respective title, article link, image, description, and date.
    for (var index=0;index<6;index++){
      var title= " " +information.articles[index].title;
      // console.log(information.articles[index].title +"titles");
      var urlink=information.articles[index].url;
      var img=information.articles[index].urlToImage;
      var description = information.articles[index].description;

      var date=information.articles[index].publishedAt;
      var source=information.articles[index].source.name;
      // console.log(source+"source");
      //
      //
      // console.log(title);
      // console.log(urlink);
      // console.log(description+"description");

      //creating HTML elements to display the news feed content.
      var image=document.createElement('img');
      var paraspace=document.createElement("P");
      var link=document.createElement('a');
      var descriptionparagraph=document.createElement("P");
      var dateparagraph=document.createElement("P");
      var sourceparagraph=document.createElement("P");
      //check if source is null
      if (source==null || source==""){
        source="No source available";
        // console.log(source);
      }
      //alternate image code if image is null.

      if(img==null){
        image.setAttribute("src","https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482930.jpg");
        image.setAttribute("width","100px");
        image.setAttribute("height","100px");
        image.setAttribute("alt","image");
        image.style.float = 'left';
        image.style.clear = 'both';
          image.style.display = 'block';
        image.style.padding = '10px';

        image.setAttribute("padding-right","10px");
      }
      //code for styling image
      else{
      image.setAttribute("src",img);
      image.setAttribute("width","100px");
      image.setAttribute("height","100px");
      image.setAttribute("alt","image");
      image.style.float = 'left';
      image.style.clear = 'both';
      image.style.display = 'block';
      image.style.padding = '10px';
      image.setAttribute("onerror","imagerror(this)");

      image.setAttribute("padding-right","10px");

}

//Setting link attribute and style for each article's link
      link.setAttribute('href',urlink);
      link.target="_blank";

      link.setAttribute("style", "background-color:none;font-family: Arial; color:black; font-size:15px; font-weight:bold; text-decoration:underline;text-align:center;");

      link.innerHTML=" " +title;
      paraspace.innerHTML="";

      //check if description is null and setting alternate message if the description is null or blank.
      if (description==null||description==""){
        descriptionparagraph.innerHTML="No description available";
        descriptionparagraph.setAttribute("style","font-family:Arial; color:black;font-size:12px; margin-bottom:30px;")
      }
      else{
      descriptionparagraph.innerHTML=description;

      descriptionparagraph.setAttribute("style","font-family:Arial; color:black;font-size:12px; margin-bottom:30px;");
    }

    //check if date is null or blank and setting alternate message if it is.
    if (date==null||date==""){
      dateparagraph.innerHTML="No publish date available";
      dateparagraph.setAttribute("style", "font-family:Verdana; color:darkblue; font-size:10px; font-weight:bold;");

    }
    else{
      dateparagraph.innerHTML="Published at: " +date + "," + " "+ "Source: " + source;
      dateparagraph.setAttribute("style", "font-family:Verdana; color:darkblue; font-size:10px; font-weight:bold;");
    }


//code for styling line with each article's date and source, changing the color of "Published at" and "Source".
    var paragraphtomixcolor = dateparagraph;
    var str = paragraphtomixcolor.innerHTML;
    var oldText="";
    var newText = "";
    var indexofsource= str.indexOf("Source")
    oldText+=str.substring(0,indexofsource).fontcolor("blue");
    newText+=str.substring(indexofsource, str.length).fontcolor("purple");
    paragraphtomixcolor.innerHTML = oldText+newText;

    //append elements to div id "home"

      document.getElementById("home").appendChild(paraspace);
      document.getElementById("home").appendChild(image);
      document.getElementById("home").appendChild(link);
      document.getElementById("home").appendChild(dateparagraph);
      document.getElementById("home").appendChild(paraspace);
      document.getElementById("home").appendChild(descriptionparagraph);


    }


  }



//function for loading latest news headlines in the right panel for users to scroll through.
function loadlatestnews(){
  //urls to pass as parameters into requests function to load latest news headlines from the three different categories.
  var url1="https://newsapi.org/v2/top-headlines?category=technology&apiKey=bc6ba5c090bc4fe492f395b955f50e0f";
  var url2="https://newsapi.org/v2/top-headlines?category=sports&apiKey=bc6ba5c090bc4fe492f395b955f50e0f";
  var url3="https://newsapi.org/v2/top-headlines?category=entertainment&apiKey=bc6ba5c090bc4fe492f395b955f50e0f";

  requests(url1);
  requests(url2);
  requests(url3);

}

//function for loading news feed on latest news panel that users can scroll through. Shows four recent headlines from each of the three categories.
//   function requests(url){

//   //API Request
//   var Request=new XMLHttpRequest();
//   Request.open('GET',url, false);
//   Request.send();


//   if(Request.readyState!=4 ||  Request.status!= 200 || Request.responseText===""){
//   window.console.error("Request had an error");
//   var error=document.createElement('H3');
//   error.innerHTML="API error."
//   document.getElementById("latestnews").appendchild(error);
//   return;
//   }
//   var information=JSON.parse(Request.responseText);
//   // console.log(information);
//   // console.log(information.articles.length +"length");
//   //loop to iterate through json object from API and store respective article title, link, date.
//   for (var index=0;index<4;index++){
//     var title= " " +information.articles[index].title;
//     // console.log(information.articles[index].title +"titles");
//     var urlink=information.articles[index].url;
//     var date=information.articles[index].publishedAt;

//     // console.log(title);
//     // console.log(urlink);

// //create HTML elements to display the article headline titles, links and dates on the panel.
//     var para=document.createElement("P");
//     var link=document.createElement('a');
//     var paragraph=document.createElement("P");
//     var paragraph2=document.createElement("P");
//     link.setAttribute('href',urlink);

//     link.setAttribute("style", "background-color:none;font-family: Arial; color:white; font-size:15px; font-weight:bold; text-align:center;text-decoration:underline");
//     link.innerHTML=" " +title;
//     link.target="_blank";
//     para.innerHTML="";
//     paragraph.setAttribute("style","font-family:Arial; color:black;font-size:12px;");
//     paragraph2.innerHTML="Published at: " +date;
//     paragraph2.setAttribute("style", "font-family:Verdana; color:white; font-size:10px; font-weight:bold;");

//     //append elements to the div id "latestnews"
//     document.getElementById("latestnews").appendChild(para);
//     document.getElementById("latestnews").appendChild(link);
//     document.getElementById("latestnews").appendChild(para);
//     document.getElementById("latestnews").appendChild(paragraph);
//     document.getElementById("latestnews").appendChild(paragraph2);


// }
// }


//function for clearing the container, specifically the elements in div id "home".
  function clearhome(){
    document.getElementById("home").innerHTML="";
  }

//function for clearing the container, specifically the elements in the div "test" id and div "pagenumber" id.
  function clearcontainer(){
    document.getElementById("test").innerHTML="";
    document.getElementById("pagenumber").innerHTML="";
  }


//function for providing alternate image if there is an image error.
  function imagerror(obj){
    var noimg = "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482930.jpg";
    obj.src=noimg;
  }



//function that takes user's search input and page to laod news based on user's selected categories and sorts the news based on the selected categories with respective tags.
      function loadcategorynews(myinput,page){
        // console.log(page);
        // console.log("page");

//functions to clear all previous content in the container.
        clearhome();
        clearcontainer();
        clearpreviouslinkcontent();
        var categoryinput;
        // console.log("myinputfromfunction"+myinput);
        //storing return value of boxchecked, which is the user's selected categories.
        var selectedcategories=boxchecked();

        //loop to iterate through the user's selected categories and counts how many are blank. If all three are blank, then category parameter is not included in the API request.
        var counter=0;
        for (var index=0; index<selectedcategories.length; index++){
          if(selectedcategories[index]==""){
            counter=counter+1;
          }
        }

        //code for if user has not selected any categories and just searched keyword. Loads news in all three categories using "q=" parameter based on user's search input.
        if (counter==3){

          var loadinputs=["Entertainment", "Technology", "Sports"];

          for (var nocategoryindex=0; nocategoryindex<selectedcategories.length; nocategoryindex++){
            selectedcategories[nocategoryindex]=loadinputs[nocategoryindex];
          }


}
//array for counting how many pages are returned by API call for each category. Variable to count how many "blank" inputs, or the number of inputs that were not selected by the user.
var pagecountbycategory=[];
var numberofblanks=0;
//loop to iterate through selectedcategories and convert user's selected categories into type string.
        for (var index=0; index<selectedcategories.length;index++){

          // console.log(selectedcategories[index]+"selectedinputs");
           categoryinput=selectedcategories[index].toString();
           //check if selected categories are not blank and then create respective category tags to display.
           if (selectedcategories[index]==""){
             numberofblanks=numberofblanks+1;
           }
           if (selectedcategories[index]!=""){
           var paragraphline=document.createElement('P');
           paragraphline.innerHTML="";
           var heading=document.createElement('H3');
           heading.innerHTML=categoryinput;
           heading.setAttribute("style", "border-radius:5px;background:#dbedef; padding:4px; width:141px; height:36px;text-align:center;border-style:solid;clear:both");
           document.getElementById("test").appendChild(paragraphline);
           document.getElementById("test").appendChild(heading);
           document.getElementById("test").appendChild(paragraphline);


//store url for API request based on user's selected category.
        var urlfirsthalf="https://newsapi.org/v2/top-headlines?"
        var urlsecondhalf= "q=" + myinput + "&"+"page="+page+"&sortBy=relevancy&category=" + categoryinput + "&apiKey=78b9d599c4f94f8fa3afb1a5458928d6";
        var url=urlfirsthalf+urlsecondhalf;
        // console.log("url"+url);
        var title;
        //API Request
        var Request=new XMLHttpRequest();
        Request.open('GET',url, false);
        Request.send();


        if(Request.readyState!=4 ||  Request.status!= 200 || Request.responseText===""){
        window.console.error("Request had an error");
        var error=document.createElement('H3');
        error.innerHTML="API error."
        document.getElementById("test").appendchild(error);
        return;
        }
        var information=JSON.parse(Request.responseText);
        // console.log(information);
        // console.log(information.articles.length +"length");
//page count based on TotalResults
        var totalResults=(parseFloat(information.totalResults));
        var pagecount=Math.ceil((totalResults/20));
        // console.log(totalResults+"totalResults");



        // console.log(pagecount+"pagecount");
        pagecountbycategory[index]=pagecount;
        if (page==1){
          document.getElementById("nextlink").style.marginLeft="475px";
        }


        else{
          document.getElementById("nextlink").style.marginLeft="518px";
          document.getElementById("previouslink").style.width="500px";
            document.getElementById("previouslink").style.position="relative";
              document.getElementById("previouslink").style.top="45px";
        }

        //code for displaying no results found if totalResults=0.
        if (information.totalResults==0||page>pagecount){
          var noresultsheading=document.createElement("H2");
          noresultsheading.setAttribute("style", "background-color:none;font-family: Arial !important; color:black; font-size:15px !important; font-weight:bold;");
          noresultsheading.innerHTML="No results found";
          document.getElementById("test").append(noresultsheading);



        }



        // console.log("results");
//iterate through json object from API to store articles titles, links, descriptions, images, dates.
        for (var informationindex=0;informationindex<information.articles.length;informationindex++){
          var title= " " +information.articles[informationindex].title;
          // console.log(information.articles[informationindex].title +"titles");
          var urlink=information.articles[informationindex].url;
          var img=information.articles[informationindex].urlToImage;
          var description = information.articles[informationindex].description;

          var date=information.articles[informationindex].publishedAt;
          var source=information.articles[informationindex].source.name;

          // console.log(title);
          // console.log(urlink);
          // console.log(description+"description");
          //create the elements to display the data
          var image=document.createElement('img');
          var secondparaspace=document.createElement("P");
          var link=document.createElement('a');
          var paragraphforcontentdescription=document.createElement("P");
          var publishparagraph=document.createElement("P");
          var sourceparagraph=document.createElement("P");



            //check if source is null
            if (source==null || source==""){
              source="No source available";
              // console.log(source);
            }

            //alternate image if image is null
          if(img==null){
            image.setAttribute("src","https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482930.jpg");

            image.setAttribute("width","100px");
            image.setAttribute("height","100px");
            image.setAttribute("alt","image");
            image.style.float = 'left';
            image.style.clear = 'both';
            image.style.display = 'block';
            image.style.padding = '10px';

            image.setAttribute("padding-right","10px");
          }
          else{

          image.setAttribute("src",img);
          image.setAttribute("width","100px");
          image.setAttribute("height","100px");
          image.setAttribute("alt","Image Not Found");
          image.setAttribute("onerror","imagerror(this)");
          image.style.float = 'left';
          image.style.clear = 'both';
          image.style.display = 'block';
          image.style.padding = '10px';

          image.setAttribute("padding-right","10px");
    }


          link.setAttribute('href',urlink);
          link.target="_blank";
          link.setAttribute("style", "background-color:none;font-family: Arial; color:black; font-size:15px; font-weight:bold; text-decoration:underline; text-align:center;");

          link.innerHTML=" " +title;
          secondparaspace.innerHTML="";
          //alternate message if description is null or blank.
          if (description==null||description==""){
            paragraphforcontentdescription.innerHTML="No description available";
            paragraphforcontentdescription.setAttribute("style","font-family:Arial; color:black;font-size:12px; margin-bottom:30px;")
          }
          else{
          paragraphforcontentdescription.innerHTML=description;

          paragraphforcontentdescription.setAttribute("style","font-family:Arial; color:black;font-size:12px; margin-bottom:30px;");
        }
        //alternate message if data is null or blank.
        if (date==null || date==""){
          publishparagraph.innerHTML="No publish date available";
          publishparagraph.setAttribute("style", "font-family:Verdana; color:darkblue; font-size:10px; font-weight:bold;");

        }
        else{
          publishparagraph.innerHTML="Published at: " +date + "," + " "+ "Source: " + source;
          publishparagraph.setAttribute("style", "font-family:Verdana; color:darkblue; font-size:10px; font-weight:bold;");
        }



        var paragraphtomixcolor = publishparagraph;
        var str = paragraphtomixcolor.innerHTML;
        var oldText="";
        var newText = "";
        var indexofsource= str.indexOf("Source")
        oldText+=str.substring(0,indexofsource).fontcolor("blue");
        newText+=str.substring(indexofsource, str.length).fontcolor("purple");
        paragraphtomixcolor.innerHTML = oldText+newText;

//append elements to div id "test".
          document.getElementById("test").appendChild(secondparaspace);
          document.getElementById("test").appendChild(image);

          document.getElementById("test").appendChild(link);
          document.getElementById("test").appendChild(publishparagraph);
          document.getElementById("test").appendChild(secondparaspace);
          document.getElementById("test").appendChild(paragraphforcontentdescription);





        }



    }
      }
      // console.log(selectedcategories.length+"selectedcategorieslength");
      // console.log(numberofblanks +"numberofblanks");
      // console.log(zeroresultcounter+"zeroresultcounter");

    //count how many of the categories selected have 0 pages of results and count what is the max number of pages needed.
      var max=0;
      var zeroresultcounter=0;
      for (var i=0; i<pagecountbycategory.length; i++){
        if (pagecountbycategory[i]>max){
          max=pagecountbycategory[i];
        }
        if (pagecountbycategory[i]==0){
          zeroresultcounter=zeroresultcounter+1;
        }
      }

//If user is on the "max" page, then the nextpage element should be hidden.

      if (page==max){
        document.getElementById("nextlink").style.visibility="hidden";


      }
//if the count of the number of categories with zero results equals the number of categories the user selected (all selected categories have zero results), then hide both next and previous page elements.
    else if (zeroresultcounter==(selectedcategories.length-numberofblanks)){
      document.getElementById("nextlink").style.visibility="hidden";
      document.getElementById("previouslink").style.visibility="hidden";


    }

      else {
       document.getElementById("nextlink").style.visibility='visible';
      }


//return the current page
      // console.log(page+"pagebeingreturned");
      var pagenumber=document.createElement("p");
      pagenumber.innerHTML=page;
      document.getElementById("pagenumber").append(page);
      // console.log(pagecountbycategory+"pagecountbycategory");
      return page;


    }


      var nextcount=1;
//function for when user selects next page item
      function nextpage(){
      document.getElementById("previouslink").style.display="block";
      var currentpage=document.getElementById('pagenumber').innerHTML;
      // console.log(currentpage + "currentpage");

      var previousinputvalue=getInputValue();
      clearcontainer();
      //updates page by calling loadcategorynews with the user's previous input value and adding one to the current page.
      updatedpage=loadcategorynews(previousinputvalue,Number(currentpage)+1);
      // console.log(updatedpage+"updatedpage");
      pagenumber.innerHTML="";
      pagenumber.innerHTML=updatedpage;







      }

//function for when user selects previous page item.
      function previouspage(){
        var currentpage=document.getElementById('pagenumber').innerHTML;
        // console.log(currentpage + "currentpage");
    //hides previous page element if the current page is 1.
        if (currentpage==1){
          document.getElementById("previouslink").style.display="none";
        }
        var previousinputvalue=getInputValue();
        clearcontainer();
        //calls loadcategorynews with previous input value and currentpage-1 as parameters.
        updatedpage=loadcategorynews(previousinputvalue,Number(currentpage)-1);
        // console.log(updatedpage+"updatedpage");
        pagenumber.innerHTML="";
        pagenumber.innerHTML=updatedpage;
        if (updatedpage==1){
          document.getElementById("previouslink").style.display="none";
        }
      }
//function for getting user's input value from search box and storing it.
      function getInputValue(){
        clearcontainer();
        clearhome();
        clearpreviouslinkcontent();
        document.getElementById("pages").style.display="block";
        var inputvalue=document.getElementById("myInput").value;

        // console.log(inputvalue);
        //calls boxchecked(), clearcontainer(), and loadcategorynews() with inputvalue and page being 1.
        boxchecked();
        clearcontainer();
        loadcategorynews(inputvalue,1);
        //display next page link item.
        document.getElementById("nextlink").style.display="block";




        //returns user's input value.
        return inputvalue;






      }
