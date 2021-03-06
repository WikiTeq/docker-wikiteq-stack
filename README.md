# [Docker Compose](https://docs.docker.com/compose/) bootstrap for [WikiTeq's MediaWiki](https://github.com/WikiTeq/docker-wikiteq-mediawiki) image

This is a sample bootstrap compose stack, see quick start instructions below.

# Quick Start

* Clone the repository
* Copy the `.env.example` to `.env`
* Modify the `.env` as needed
* Run `./compose up -d`

**Note:** the `compose.sh` is a special wrapper that provides support for
`docker-compose.yml` extensions. You'll find more information on the extension
below, but generally it's recommended to use `./compose` instead of `docker-compose`.

The `./compose` is a simple wrapper, so you can pass any arguments to it similarly
how it could be done with the original `docker-compose`, eg:

```bash
./compose ps
./compose up -d
./compose down
./compose restart
# etc
```

# Composition

The stack is composed of the following containers:

Required:
- `db` - MySQL, a database backend for MediaWiki.
- `web` - Apache/MediaWiki container with PHP on the board

Optional, can be enabled via compose-extension:
- `redis` - Redis cache ( see `docker-compose/redis.yml.example` )
- `elasticsearch` - ElasticSearch instance ( see `docker-compose/elasticsearch.yml.example` )
- `matomo` - Matomo site analytics

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
- `MW_ENABLE_SITEMAP_GENERATOR` defines if sitemap generation is enabled or not
- `MW_SITEMAP_PAUSE_DAYS` if the above is enabled, sets the delys between sitemap regenerations
- `PHP_UPLOAD_MAX_FILESIZE` sets max upload size
- `PHP_POST_MAX_SIZE` sets max post size
- `LOG_FILES_COMPRESS_DELAY` sets logs compression delay in seconds
- `LOG_FILES_REMOVE_OLDER_THAN_DAYS` sets lifespan for old logs
- `MW_ENABLE_TRANSCODER` defines if the transcoder service is enabled
- `MW_JOB_TRANSCODER_PAUSE` sets the transcoder service delay in seconds
- `MW_ENABLE_JOB_RUNNER` defines if the job runner service is enabled
- `MW_JOB_RUNNER_PAUSE` sets the job runner service delay in seconds
- `MW_ENABLE_EMAIL` controls the `$wgEnableEmail`
- `MW_ENABLE_USER_EMAIL` controls the `$wgEnableUserEmail`
- `MW_EMERGENCY_CONTACT` controls the `$wgEmergencyContact`
- `MW_PASSWORD_SENDER` controls the `$wgPasswordSender`
- `MW_DB_TYPE` controls the `$wgDBtype`
- `MW_DB_SERVER` controls the `$wgDBserver`
- `MW_DB_NAME` controls the `$wgDBname`
- `MW_USE_CACHE_DIRECTORY` controls the `$wgCacheDirectory`, if set to `true` puts `$IP/cache` as a value
- `MW_SECRET_KEY` controls the `$wgSecretKey`
- `MW_USE_IMAGE_MAGIC` controls the `$wgUseImageMagick`
- `MW_LOAD_SKINS` controls the list of extension to enable out of the pre-installed skins list (see below)
- `MW_LOAD_EXTENSIONS` controls the list of extension to enable out of the pre-installed extensions list (see below)
- `MATOMO_USER` - Matomo username, fill in after initial Matomo setup
- `MATOMO_PASSWORD` - Matomo password, fill in after initial Matomo setup
- `MATOMO_URL` - URL of the Matomo instance within the network, keep as it in most cases

# Settings

The stack will optionally load a settings file from the `_settings/LocalSettings.php`
and will append it to the bottom of the original `LocalSettings.php` of the container.

# Extending the `docker-compose.yml`

The proper way to make modifications or additions to the orignal
`docker-compose.yml` is to add override-files to the `docker-compose`
directory, see `logo.yml.example`. Only files with `.yml` extension
are loaded.

This is based on the [Compose extends](https://docs.docker.com/compose/extends/)
feature.

For example:

* Create `_resources` directory and put your logo there (`_resources/logo.png`)
* Create `logo.yml` file inside the `docker-compose` directory with the following contents:

```yml
version: '3.1'
services:
  web:
    volumes:
      - ./_resources/logo.png:/var/www/html/w/logo.png
```

* And run or re-create the stack via `./compose up -d`

Please refer to the https://docs.docker.com/compose/extends/#adding-and-overriding-configuration
for details about `docker-compose.yml` overriding specifics.

## Upgrading

Pull the latest image, stop, rebuild and start containers:

```sh
docker pull ghcr.io/wikiteq/mediawiki:latest
./compose up -d
```

# Making backups

```sh
./compose exec db /bin/bash -c 'mysqldump --all-databases -uroot -p"$MYSQL_ROOT_PASSWORD" 2>/dev/null | gzip | base64 -w 0' | base64 -d > backup_$(date +"%Y%m%d_%H%M%S").sql.gz
./compose exec web /bin/bash -c 'tar -c $MW_VOLUME $MW_HOME/images 2>/dev/null | base64 -w 0' | base64 -d > backup_$(date +"%Y%m%d_%H%M%S").tar
```

# Keep it up to date

One of the way to keep the stack up to date and hence separated from your deployment changes
if to follow the deployment procedure below:

* Clone the stack into, say, `docker-wikiteq-stack`
* Copy the `.env.example` to `.env` (it's git-ignored)
* Override compose stack with new files created within `docker-compose` directory (they're git-ignored too)
* Follow the instructions above to put your custom files like logos or custom extensions into `_resources` directory (which is fully git-ignored)
* Keep the custom PHP settings files within the `_settings` directory (which is git-ignored too)

With the setup above you should have no issues with updating the stack base like below:
```bash
cd docker-wikiteq-stack && git pull
./compose up -d
```

The limitation of the approach above is that you can't version your own changes to the stack. To workaround this
you can try another method like below:

* Clone the stack into, say, `docker-wikiteq-stack`
* Create new directory for your modifications, say, `docker-wikiteq-stack-MyWiki`
* Put all your customizations there and symlink all the files to their directories within
the `docker-wikiteq-stack`. For example:

* `docker-wikiteq-stack-MyWiki/_settings/LocalSettings.php` symlinked to `docker-wikiteq-stack/_settings/LocalSettings.php`
* `docker-wikiteq-stack-MyWiki/_resources/logo.png` symlinked to `docker-wikiteq-stack/_resources/logo.png`
* `docker-wikiteq-stack-MyWiki/docker-compose/redis.yml` symlinked to `docker-wikiteq-stack/docker-compose/redis.yml`
* `docker-wikiteq-stack-MyWiki/.evn` symlinked to `docker-wikiteq-stack/.evn` (if there is a reason to version `.env`)

In result, you'll be able to version your modifications via git keeping the stack files untouched
and so be able to version the stack separately from your modifications.


# Matomo

By default the Matomo runs on 8182 port (to be shadowed with Nginx) and requires initial setup
on first run. Once installed, modify the `.env` file by adding `MATOMO_USER` and `MATOMO_PASSWORD`
variables matching user/password that was used during installation.

Make the `matomo_import_logs.sh` be run on Cron @daily close to midnight to keep the Matomo
fed with visits information, eg:

```
55 23 * * * cd ~/docker/ && ./import_logs_matomo.sh >> ~/import.log
```

## Nginx configuration

```apacheconf
   # matomo
   location /matomo/ {
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Uri /matomo;
        proxy_read_timeout 300;
        proxy_pass http://127.0.0.1:8182/;
        proxy_set_header X-Forwarded-For $remote_addr;
   }
```

Plus once containers are started modify the Matomo config as below (the settings are intended to
be generated automatically, but it's better to verify):

```php
[General]
trusted_hosts[] = "127.0.0.1:8182"
assume_secure_protocol = 1
force_ssl=0
proxy_uri_header = 1
```
