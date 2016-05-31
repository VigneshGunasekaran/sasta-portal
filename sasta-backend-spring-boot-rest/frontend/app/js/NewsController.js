app.controller('NewsController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','$q',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage,$q){
 
 
   
    $scope.NewsList= [{
    "image": "assets/figure/news-img1.jpg",
    "date": "May 14, 2016",
    "PostedBy": "Posted By : Admin",
    "title": "Posted By : Admin",
     "Content": "Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio."
    },
    {
    "image": "/assets/figure/news-img2.jpg",
    "date": "May 14, 2016",
    "PostedBy": "Posted By : Admin",
    "title": "Posted By : Admin",
     "Content": "Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio."
    },
     {
    "image": "/assets/figure/news-img3.jpg",
    "date": "May 14, 2016",
    "PostedBy": "Posted By : Admin",
    "title": "Posted By : Admin",
     "Content": "Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio."
    }
    ,
     {
    "image": "/assets/figure/news-img3.jpg",
    "date": "May 14, 2016",
    "PostedBy": "Posted By : Admin",
    "title": "Posted By : Admin",
     "Content": "Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio."
    }
    ,
     {
    "image": "/assets/figure/news-img3.jpg",
    "date": "May 14, 2016",
    "PostedBy": "Posted By : Admin",
    "title": "Posted By : Admin",
     "Content": "Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio."
    }
    ,
     {
    "image": "/assets/figure/news-img3.jpg",
    "date": "May 14, 2016",
    "PostedBy": "Posted By : Admin",
    "title": "Posted By : Admin",
     "Content": "Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio."
    }
    ];

   $scope.NewDetails = function(){
   
	  window.location = "#/ui/news-details";
	}

 
		
}]);