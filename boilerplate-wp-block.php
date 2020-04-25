<?php
/*
Plugin Name: Boilerplate for Gutenberg blocks
*/

require_once 'blocks/blockname.php';
require_once 'blocks/dynamic-blockname.php';
require_once 'blocks/dynamic-with-serversiderender.php';


// Block created using WP-CLI
// ------------------------------
// Command used: wp scaffold block wpcli-block --title="Sample WP-CLI block" --dashicon="video-alt3" --category="widgets" --plugin=boilerplate-wp-block
// Docs: https://developer.wordpress.org/cli/commands/scaffold/block/
// Files generated automatically
// PHP need to be manually loaded here
// JS is generated as ES5, not ESNext
require_once 'blocks/wpcli-block.php';
