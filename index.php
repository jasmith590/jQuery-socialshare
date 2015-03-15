<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Social Share jQuery Plugin Example</title>
    <link rel="stylesheet" href="font-awesome.css">
    <link rel="stylesheet" href="style.css">
    <script src="//code.jquery.com/jquery-2.1.3.min.js"></script>
    <script src="jquery.socialshare.js"></script>
    <script type="text/javascript">
        jQuery(document).ready(function($){
            $('.share').socialSharer({debug: false});
        });
    </script>
</head>

<body>
    <div class="share">
        <i class="fa fa-facebook" data-network="facebook"></i>
        <i class="fa fa-google-plus" data-network="google_plus"></i>
        <i class="fa fa-twitter" data-network="twitter"></i>
        <i class="fa fa-pinterest" data-network="pinterest"></i>
    </div>
</body>
</html>