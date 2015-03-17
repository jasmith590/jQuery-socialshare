<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Social Share jQuery Plugin Example</title>
    <link href='http://fonts.googleapis.com/css?family=Overlock:400,700' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="font-awesome.css">
    <link rel="stylesheet" href="style.css">
    <script src="//code.jquery.com/jquery-2.1.3.min.js"></script>
    <script src="jquery.socialshare.js"></script>
    <script type="text/javascript">
        jQuery(document).ready(function($){
            $('.share').socialSharer({debug: false, oneButton: true});
        });
    </script>
</head>

<body>
    <h1>Social Share</h1>
    <a target="_blank" href="https://github.com/jasmith590/jQuery-socialshare"><img style="position: absolute; top: 0; left: 0; border: 0;" src="https://camo.githubusercontent.com/82b228a3648bf44fc1163ef44c62fcc60081495e/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f6c6566745f7265645f6161303030302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_left_red_aa0000.png"></a>
    <div class="share">
        <i class="fa fa-facebook" data-network="facebook"></i>
        <i class="fa fa-google-plus" data-network="google_plus"></i>
        <i class="fa fa-twitter" data-network="twitter"></i>
        <i class="fa fa-pinterest" data-network="pinterest"></i>
    </div>
</body>
</html>