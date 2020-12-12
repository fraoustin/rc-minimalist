FROM roundcube/roundcubemail
LABEL maintainer "fraoustin@gmail.com"

RUN mkdir -p /var/www/html/skins/rc-minimalist
WORKDIR /var/www/html/skins/rc-minimalist
COPY ./ ./
RUN chown -R www-data:www-data /var/www/html/skins/rc-minimalist

WORKDIR /var/www/html

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["apache2-foreground"]