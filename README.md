# docker-wikiteq-stack

# TODO

* MW_DB_INSTALLDB_USER seems to be surplus and duplicates MW_DB_USER ? or 
it is alays root?
* Do we need the INSTALLDB credentials at all? do we need DB credetnails at all?

what's the flow of ENV variables across the files?

* ENV in Dockerfile
* ENV in bash scripts
* ENV in php scripts
* ENV in docker-compose.yml
* ENV in .env

??

some envs in DockerSettings.php use (bool) conversion, others are not
maybe unify it


* it looks like MW_USE_CACHE_DIRECTORY sets cache directory but does not
enable file cache
  

Dockerfile has hard-coded:

$wgUseCdn = true;
$wgCdnServersNoPurge = [];
$wgCdnServersNoPurge[] = '172.16.0.0/12';

Skins bundled:

'chameleon',
'CologneBlue',
'Modern',
'MonoBook', # bundled
'Refreshed',
'Timeless', # bundled
'Vector', # bundled

Extensions bundled:

'AdvancedSearch',
'AJAXPoll',
'AntiSpoof',
'ApprovedRevs',
'Arrays',
'BetaFeatures',
'Bootstrap',
'BreadCrumbs2',
'CategoryTree', # bundled
'ChangeAuthor',
'CharInsert',
'CheckUser',
'CirrusSearch',
'Elastica',
'Cite', # bundled
'CiteThisPage', # bundled
'CodeEditor', # bundled
'CodeMirror',
'Collection',
'CommentStreams',
'CommonsMetadata',
'ConfirmEdit', # bundled
'ConfirmEdit/QuestyCaptcha', # bundled
'ConfirmEdit/ReCaptchaNoCaptcha', # bundled
'ContactPage',
'DataTransfer',
'Description2',
'Disambiguator',
'DisplayTitle',
'Echo',
'EditUser',
'EmbedVideo',
'EncryptedUploads',
'EventLogging',
'Favorites',
'Flow',
'Gadgets', # bundled
'GoogleAnalyticsMetrics',
'GoogleDocCreator',
'GoogleDocTag',
'GTag',
'HeaderTabs',
'HeadScript',
'HTMLTags',
'IframePage',
'ImageMap', # bundled
'InputBox', # bundled
'Interwiki', # bundled
'Lazyload',
'LinkSuggest',
'LinkTarget',
'LiquidThreads',
'LocalisationUpdate', # bundled
'LockAuthor',
'Lockdown',
'LookupUser',
'Loops',
'Maps',
'MassMessage',
'MassMessageEmail',
'MassPasswordReset',
'Math',
'MathJax',
'Mendeley',
'MsUpload',
'MultimediaViewer', # bundled
'MyVariables',
'NCBITaxonomyLookup',
'Nuke', # bundled
'OATHAuth', # bundled
'PageExchange',
'PageImages', # bundled
//	'PageForms',   must be enabled manually after enableSemantics()
'ParserFunctions', # bundled
'PdfHandler', # bundled
'Poem', # bundled
'Popups',
'PubmedParser',
'Renameuser', # bundled
'ReplaceText', # bundled
'RottenLinks',
'SaveSpinner',
'Scopus',
'Scribunto', # bundled
'SecureLinkFixer', # bundled
'SemanticExternalQueryLookup',
'SemanticExtraSpecialProperties',
'SemanticCompoundQueries',
'SemanticDrilldown',
'SemanticResultFormats',
'ShowMe',
'SimpleChanges',
'Skinny',
'SkinPerNamespace',
'SkinPerPage',
'SpamBlacklist', # bundled
'SRFEventCalendarMod',
'Sync',
'SyntaxHighlight_GeSHi', # bundled
'Tabber',
'Tabs',
'TemplateData', # bundled
'TemplateStyles',
'TextExtracts', # bundled
'Thanks',
'TimedMediaHandler',
'TinyMCE',
'TitleBlacklist', # bundled
'TwitterTag',
'UniversalLanguageSelector',
'UploadWizard',
'UploadWizardExtraButtons',
'UrlGetParameters',
'UserMerge',
'Variables',
'VEForAll',
'VisualEditor', # bundled
'VoteNY',
'Widgets',
'WikiEditor', # bundled
'WikiForum',
'WikiSEO',
'YouTube',

# Environment variables

https://vsupalov.com/docker-arg-env-variable-guide/
