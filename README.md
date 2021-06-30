# [Docker Compose](https://docs.docker.com/compose/) bootstrap for [WikiTeq's MediaWiki](https://github.com/WikiTeq/docker-wikiteq-mediawiki) image

This is a sample bootstrap compose stack, see quick start instructions below.

# Quick Start

* Clone the repository
* Copy the `.env.example` to `.env`
* Modify the `.env` as needed
* Run `docker-compose up -d`

# Composition

The stack is composed of the following container:

- `db` - MySQL, a database backend for MediaWiki.
- `web` - Apache/MediaWiki container with PHP on the board
- `redis` - Redis cache
- `elasticsearch` - ElasticSearch instance

# Configuration

All the configurations must be done via modifying the `.env` file,
see `.env.example` for a list of variables

## Environment variables

- `MW_SITE_SERVER` configures [$wgServer](https://www.mediawiki.org/wiki/Manual:$wgServer); set this to the server host and include the protocol like `http://my-wiki:8080`
- `MW_SITE_NAME` configures [$wgSitename](https://www.mediawiki.org/wiki/Manual:$wgSitename)
- `MW_SITE_LANG` configures [$wgLanguageCode](https://www.mediawiki.org/wiki/Manual:$wgLanguageCode)
- `MW_DEFAULT_SKIN` configures [$wgDefaultSkin](https://www.mediawiki.org/wiki/Manual:$wgDefaultSkin)
- `MW_ENABLE_UPLOADS` configures [$wgEnableUploads](https://www.mediawiki.org/wiki/Manual:$wgEnableUploads)
- `MW_USE_INSTANT_COMMONS` configures [$wgUseInstantCommons](https://www.mediawiki.org/wiki/Manual:$wgUseInstantCommons)
- `MW_ADMIN_USER` configures the default administrator username
- `MW_ADMIN_PASS` configures the default administrator password
- `MW_DB_NAME` specifies the database name that will be created automatically upon container startup
- `MW_DB_USER` specifies the database user for access to the database specified in `MW_DB_NAME`
- `MW_DB_PASS` specifies the database user password
- `MW_DB_INSTALLDB_USER` specifies the database superuser name for create database and user specified above
- `MW_DB_INSTALLDB_PASS` specifies the database superuser password; should be the same as `MYSQL_ROOT_PASSWORD` in db section.
- `MW_PROXY_SERVERS` (comma separated values) configures [$wgSquidServers](https://www.mediawiki.org/wiki/Manual:$wgSquidServers). Leave empty if no reverse proxy server used.
- `MW_MAIN_CACHE_TYPE` configures [$wgMainCacheType](https://www.mediawiki.org/wiki/Manual:$wgMainCacheType). `MW_MEMCACHED_SERVERS` should be provided for `CACHE_MEMCACHED`.
- `MW_MEMCACHED_SERVERS` (comma separated values) configures [$wgMemCachedServers](https://www.mediawiki.org/wiki/Manual:$wgMemCachedServers).
- `MW_AUTOUPDATE` if `true` (by default), run needed maintenance scripts automatically before web server start.
- `MW_SHOW_EXCEPTION_DETAILS` if `true` (by default) configures [$wgShowExceptionDetails](https://www.mediawiki.org/wiki/Manual:$wgShowExceptionDetails) as true.
- `PHP_LOG_ERRORS` specifies `log_errors` parameter in `php.ini` file.
- `PHP_ERROR_REPORTING` specifies `error_reporting` parameter in `php.ini` file. `E_ALL` by default, on production should be changed to `E_ALL & ~E_DEPRECATED & ~E_STRICT`.

# Settings

The stack will load all the PHP settings files from the `_settings` directory
and will append each file to the bottom of the original `LocalSettings.php`
of the MediaWiki inside the container.

In order to supply the wiki with some custom settings just create a 
`LocalSettings.php` file inside the `_settings` directory. The file name is
not important.

# Modifying the `docker-compose.yml`

In order to modify the stack eg. to mount some files, like a logo,
just use `volumes` section on the `docker-compose.yml` by expanding
the section using [Compose extends](https://docs.docker.com/compose/extends/),
eg: to add a custom logo

* Create `_resources` directory and put your logo there (`_resources/logo.png`)
* Create `docker-compose.override.yml` file at root
* Expand the `web` volumes section by adding the following lines:

```yml
version: '3.1'
services:
  web:
    volumes:
      - ./_resources/logo.png:/var/www/html/w/logo.png

```

* And run or re-create the stack via `docker-compose up -d`

## Upgrading

Pull the latest image, stop, rebuild and start containers:

```sh
docker pull ghcr.io/wikiteq/mediawiki:latest
docker-compose up -d
```

# Making backups

```sh
docker-compose exec db /bin/bash -c 'mysqldump --all-databases -uroot -p"$MYSQL_ROOT_PASSWORD" 2>/dev/null | gzip | base64 -w 0' | base64 -d > backup_$(date +"%Y%m%d_%H%M%S").sql.gz
docker-compose exec web /bin/bash -c 'tar -c $MW_VOLUME $MW_HOME/images 2>/dev/null | base64 -w 0' | base64 -d > backup_$(date +"%Y%m%d_%H%M%S").tar
```
