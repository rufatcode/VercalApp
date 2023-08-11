$("document").ready(function(){
    
    $("#headling .catagory>span").click(function(){
        if ($("#headling .catagory>div").attr("class").includes("d-none")) {
            $("#headling .catagory>div").removeClass("d-none");
            $("#headling .catagory>div").addClass("d-block");
            $("#headling .catagory>span>i").addClass("fa-chevron-down");
            $("#headling .catagory>span>i").removeClass("fa-chevron-right");
            
        }
        else{
            $("#headling .catagory>div").addClass("d-none");
            $("#headling .catagory>div").removeClass("d-block");
            $("#headling .catagory>span>i").removeClass("fa-chevron-down");
            $("#headling .catagory>span>i").addClass("fa-chevron-right");
            
        }
    })
    $("nav .searchContent>input").mouseenter(function(){
        $("nav .searchContent>input").css({
            'border-color':'red',
        })
        $("nav .searchContent .Selection").css({
            'border-color':'red',
        })
    })
    $("nav .searchContent>input").mouseleave(function(){
        $("nav .searchContent>input").css({
            'border-color':'rgba(0, 0, 0, 0.054)',
        })
        $("nav .searchContent .Selection").css({
            'border-color':'rgba(0, 0, 0, 0.054)',
        })
    })
    
    $("nav .searchContent .Selection").mouseenter(function(){
        $("nav .searchContent>input").css({
            'border-color':'red',
        })
        $("nav .searchContent .Selection").css({
            'border-color':'red',
        })
    })
    $("nav .searchContent .Selection").mouseleave(function(){
        $("nav .searchContent>input").css({
            'border-color':'rgba(0, 0, 0, 0.054)',
        })
        $("nav .searchContent .Selection").css({
            'border-color':'rgba(0, 0, 0, 0.054)',
        })
    })

    $("nav .Selection").click(function(){
        if ($("nav .Selection>div").attr("class").includes("d-none")) {
            $("nav .Selection>div").removeClass("d-none");
            $("nav .Selection>div").addClass("d-block");

            
        }

        else{
            $("nav .Selection>div").addClass("d-none");
            $("nav .Selection>div").removeClass("d-block");
            
        }
       
    })
    $("nav .Selection .Catagory p").click(function(){
        $("nav .Selection>span").html($(this).html());   
    })


    $("#SearchPhone .searchContent .Selection").click(function(){
        
        if ($("#SearchPhone .searchContent .Selection>div").attr("class").includes("d-none")) {
            $("#SearchPhone .searchContent .Selection>div").removeClass("d-none");
            $("#SearchPhone .searchContent .Selection>div").addClass("d-block");

            
        }

        else{
            $("#SearchPhone .searchContent .Selection>div").addClass("d-none");
            $("#SearchPhone .searchContent .Selection>div").removeClass("d-block");
            
        }
       
       
    })
    $("#SearchPhone .searchContent .Selection").mouseenter(function(){
        $("#SearchPhone .searchContent .Selection").css({
            'border-color':'red',
        })
    })
    $("#SearchPhone .searchContent .Selection").mouseleave(function(){
        $("#SearchPhone .searchContent .Selection").css({
            'border-color':'rgba(0, 0, 0, 0.054)',
        })
    })
    $("#SearchPhone .searchContent .Selection>.Catagory>p>span").click(function(){
        $("#SearchPhone .searchContent .Selection>span").html($(this).html());   
    })

    $("#main>div>.first>.bath").click(function(){
        if($("#main>div>.first>ul").attr("class").includes("d-none")){
            $("#main>div>.first>ul").addClass("d-block");
            $("#main>div>.first>ul").removeClass("d-none");
            $("#main>div>.first>.bath>i").removeClass("fa-chevron-down");
            $("#main>div>.first>.bath>i").addClass("fa-chevron-right");
        }
        else{
            $("#main>div>.first>ul").removeClass("d-block");
            $("#main>div>.first>ul").addClass("d-none");
            $("#main>div>.first>.bath>i").addClass("fa-chevron-down");
            $("#main>div>.first>.bath>i").removeClass("fa-chevron-right");
        }
    })

})