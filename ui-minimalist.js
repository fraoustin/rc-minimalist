console.log("rc-minimalist skin")

$('#layout-list').addClass('minimalist');

function viewToolBarMail() {
    // add float button for reply
    if ( !$( "html.layout-large body.task-mail div#layout-content .floating-action-buttons" ).length && !$( "#layout-list" ).length ){
        var divfloat = $('<div>')
            .attr({'class': 'floating-action-buttons reply'});
        $('<a>')
            .attr({'class': 'reply button', title: rcmail.gettext('reply'), 'onclick': "return rcmail.command('reply-all','',this,event)"})
            .appendTo(divfloat);
        divfloat.appendTo($('html.layout-large body.task-mail div#layout-content'));
    } 
}

if (rcmail.env.task == 'mail') {
    // add button on search bar
    $('.searchbar').each(function() {
        var input = $('input:not([type=hidden])', this),
            options_button = $('a.button.options', this);
        if (input.is('#mailsearchform')) {
            $('<a>')
                .attr({'class': 'button sliders', href: '#', role: 'button', title: rcmail.gettext('options')})
                .on('click', function(e) {
                    return rcmail.command('menu-open', 'messagelistmenu', this, event);
                })
                .insertAfter(options_button);
        }
    });

    function changeBadge(){
        $('tr.message').each(function(elt) {
            if ( $('td.subject .msgicon', this).hasClass('unread') ) {
                $('td.circle .badge', this).addClass('unread')
            } else {
                $('td.circle .badge', this).removeClass('unread')
            };
        });
    }

    function changeListmessage(prop) {
        $('tr.message:not(.minimalist)').each(function(elt) { 
            // reverse subject vs fromto
            var subjectSpan =$('td.subject span.subject', this).detach();
            $('td.subject', this).prepend(subjectSpan);
            var dateSpan =$('td.subject span.date', this).detach();
            $('td.subject span.subject', this).append(dateSpan); 
            // add circle with first letter name
            var letter = $('td.subject .rcmContactAddress', this).text().substring(0, 1).toUpperCase();
            var unread = "";
            if ( $('td.subject .msgicon', this).hasClass('unread') ) {
                unread = "unread";
            };
            var circle =  $('<td>').attr({'class': 'circle message'})
            var divcircle =  $('<div>').attr({'class': 'badge ' + letter.toLowerCase() + ' ' + unread})
            divcircle.text(letter)
            divcircle.appendTo(circle);
            circle.insertBefore($('td.subject', this));
            // add button del move
            var spanMenu =  $('<span>').attr({'class': 'menu'})
            $('<a>')
                .attr({'class': 'delete shortcut-minimalist', role: 'button', title: rcmail.gettext('delete')})
                .on('click', function(event) {
                    rcmail.delete_messages();
                    event.stopPropagation();
                    event.stopImmediatePropagation();
                })
                .appendTo(spanMenu);
            $('<a>')
                .attr({'class': 'extwin shortcut-minimalist', role: 'button', title: rcmail.gettext('extwin')})
                .on('click', function(event) {
                    rcmail.open_window($(location).attr('href') + "&_action=show&_extwin=1&_uid=" + rcmail.message_list.get_selection(), true);
                    event.stopPropagation();
                    event.stopImmediatePropagation();
                })
                .appendTo(spanMenu);
            $('<a>')
                    .attr({'class': 'read shortcut-minimalist', role: 'button', title: rcmail.gettext('read')})
                    .on('click', function(event) {
                        rcmail.mark_message('read', rcmail.message_list.get_selection());
                        changeBadge();  
                    })
                    .appendTo(spanMenu);
            $('<a>')
                    .attr({'class': 'unread shortcut-minimalist', role: 'button', title: rcmail.gettext('unread')})
                    .on('click', function(event) {
                        rcmail.mark_message('unread', rcmail.message_list.get_selection());
                        changeBadge();  
                    })
                    .appendTo(spanMenu);
            spanMenu.appendTo($('td.subject', this));
            $(this).addClass('minimalist');
            $(this).on('click', function(event){ viewToolBarMail();})
            $(this).find('*').each(function( index ) {
                $(this).on('click', function(event){ viewToolBarMail();})
            })
        });     
    };
    window.setInterval(function(){changeBadge();}, 2000);  

    // add button on message
    rcmail.addEventListener('listupdate', changeListmessage);
    // minifier toolbar to top-right
    $('.header-links a').each(function( index ) {
        $(this).text('');
    })
    $('html.layout-normal, html.layout-large').find('ul#toolbar-menu span.inner').each(function( index ) {
        $(this).remove();
    })
    $('html.layout-normal, html.layout-large').find('ul#toolbar-menu li').each(function() {
        $(this).parent().prepend(this);
    });
    // add float button for compose mail
    var divfloat = $('<div>')
        .attr({'class': 'floating-action-buttons'});
    $('<a>')
        .attr({'class': 'compose button', title: rcmail.gettext('compose'), 'href': $('.action-buttons .compose').attr('href')})
        .appendTo(divfloat);
    divfloat.insertAfter($('html.layout-large div#layout-list .footer'));
    if ( !$( "#layout-list" ).length ) {viewToolBarMail();}

    // add button in search bar
    var burger =$('<a>')
        .attr({'class': 'button burger nomobile', href: '#sidebar', role: 'button', title: rcmail.gettext('options')})
        .on('click', function(e) {
            if ($('body.task-mail #layout-sidebar').hasClass('hide')) {
                $('body.task-mail #layout-sidebar').removeClass('hide')
            }else{
                $('body.task-mail #layout-sidebar').addClass('hide')
            }
        })
    $('#layout-list .searchbar.menu').prepend(burger);
    $('body.task-mail #layout-sidebar:not(.sidebar-right)').addClass('hide')

    $('#layout-list .searchbar.menu').prepend($('#messagelist-header .back-sidebar-button.folders'));
    $('#layout-list .searchbar.menu').prepend($('#messagelist-header .task-menu-button'));


}

// addressbook
if (rcmail.env.task == 'addressbook') {
    // minifier toolbar to top-right
    $('html.layout-normal, html.layout-large').find('ul#toolbar-menu span.inner').each(function( index ) {
        $(this).remove();
    })
    $('html.layout-normal, html.layout-large').find('ul#toolbar-menu li').each(function() {
        $(this).parent().prepend(this);
    });
    $('html.layout-normal, html.layout-large').find('ul#toolbar-menu li .create').remove()
    // add button in searchbar
    $('#layout-list .searchbar.menu').prepend($('#layout-list .header .back-sidebar-button.folders'));
    $('#layout-list .searchbar.menu').prepend($('#layout-list .header .task-menu-button'));
    $('#layout-list .header .toolbar-menu-button').appendTo($('#layout-list .searchbar.menu'));
    // add float button for add contact
    var divfloat = $('<div>')
        .attr({'class': 'floating-action-buttons'});
    $('<a>')
        .attr({'class': 'create button', title: rcmail.gettext('compose')})
        .on('click', function(e) {return rcmail.command('add','',this,event)})
        .appendTo(divfloat);
    divfloat.insertAfter($('html.layout-large div#layout-list .footer'));
}

// button left
$('#taskmenu span.special-buttons').prepend($('#taskmenu a.settings'))

