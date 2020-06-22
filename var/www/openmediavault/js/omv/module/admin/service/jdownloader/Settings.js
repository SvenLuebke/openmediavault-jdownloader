/**
 * @license   http://www.gnu.org/licenses/gpl.html GPL Version 3
 * @author    Volker Theile <volker.theile@openmediavault.org>
 * @author    OpenMediaVault Plugin Developers <plugins@omv-extras.org>
 * @copyright Copyright (c) 2009-2013 Volker Theile
 * @copyright Copyright (c) 2015-2016 OpenMediaVault Plugin Developers
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

// require("js/omv/WorkspaceManager.js")
// require("js/omv/workspace/form/Panel.js")
// require("js/omv/form/field/SharedFolderComboBox.js")
// require("js/omv/form/plugin/LinkedFields.js")

Ext.define('OMV.module.admin.service.jdownloader.Settings', {
    extend   : 'OMV.workspace.form.Panel',
    requires : [
        'OMV.form.field.SharedFolderComboBox'
    ],

    initComponent : function () {
        var me = this;

        me.on('load', function () {
            var checked = me.findField('enable').checked;
            var showtab = me.findField('showtab').checked;
            var parent = me.up('tabpanel');

            if (!parent)
                return;

            var managementPanel = parent.down('panel[title=' + _('Web Interface') + ']');

            if (managementPanel) {
                checked ? managementPanel.enable() : managementPanel.disable();
                showtab ? managementPanel.tab.show() : managementPanel.tab.hide();
            }
        });

        me.callParent(arguments);
    },

    rpcService   : 'Jdownloader',
    rpcGetMethod : 'getSettings',
    rpcSetMethod : 'setSettings',

    getButtonItems: function() {
        var items = this.callParent(arguments);

        items.push({
            id: this.getId() + "-show",
            xtype: "button",
            text: _("Open Web Client"),
            icon: "images/jdownloader.png",
            iconCls: Ext.baseCSSPrefix + "btn-icon-16x16",
            scope: this,
            handler: function() {
                var link = "http://my.jdownloader.org/";
                window.open(link, "_blank");
            }
        });
            return items;
    },

    getFormItems : function() {
        var me = this;
        return [{
            xtype    : 'fieldset',
            title    : 'General settings',
            defaults : {
                labelSeparator : ''
            },
            items : [{
                xtype      : 'checkbox',
                name       : 'enable',
                fieldLabel : _('Enable'),
                checked    : false
            },{
                xtype      : 'checkbox',
                name       : 'showtab',
                fieldLabel : _('Show Tab'),
                boxLabel   : _('Show tab containing my.jdownloader site.'),
                checked    : false
            },{
                xtype      : 'checkbox',
                name       : 'enablelog',
                fieldLabel : _('Logging'),
                boxLabel   : _('Will create a log file in the download folder.'),
                checked    : false
            }]
            },{
                xtype    : 'fieldset',
                title    : _('Jdownloader Settings'),
                defaults : {
                    labelSeparator:''
                },
            items    : [{
                xtype      : 'textfield',
                name       : 'jdusername',
                fieldLabel : _('Email address'),
                allowBlank : false,
                vtype      : 'email',
                plugins    : [{
                    ptype : 'fieldinfo',
                    text  : _('Email address used on my.jdownloader.org.')
                }]
            },{
                xtype      : 'passwordfield',
                name       : 'jdpassword',
                fieldLabel : _('Password'),
                allowBlank : false,
                plugins    : [{
                    ptype : 'fieldinfo',
                    text  : _('Password used on my.jdownloader.org.')
                }]
            },{
                ptype : 'fieldinfo',
                xtype      : 'sharedfoldercombo',
                name       : 'download-sharedfolderref',
                fieldLabel : _('Shared folder'),
                plugins    : [{
                    ptype : 'fieldinfo',
                    text  : _("Make sure the group 'users' has read/write access to the shared folder.")
                }]
            },{
                xtype      : 'textfield',
                name       : 'download-dir',
                fieldLabel : _('Directory'),
                allowBlank : true,
                plugins    : [{
                    ptype : 'fieldinfo',
                    text  : _('Directory to store downloads.')
                }]
            },{
                 xtype      : 'textfield',
                name       : 'log-dir',
                fieldLabel : _('Log drectory'),
                allowBlank : true,
                plugins    : [{
                    ptype : 'fieldinfo',
                    text  : _('Directory to store logfile')
                }]
            },{
                xtype      : 'numberfield',
                name       : 'cpuquota',
                fieldLabel : _('CPU-quota'),
		minValue: 10,
		maxValue: 100,
		allowDecimals: false,
		allowBlank: false,
                plugins    : [{
                    ptype : 'fieldinfo',
                    text  : _("sets how much of cpu % jdownloader can use")
                }]
            }]
            },{
                xtype    : 'fieldset',
                title    : _('Jdownloader Infomation Panel'),
                defaults : {
                    labelSeparator:''
                },
                items      : [{
                xtype      : 'textfield',
                name       : 'jderror',
                fieldLabel : _('Error'),
                submitValue: false,
                readOnly   : true,
                plugins    : [{
                    ptype : 'fieldinfo',
                    text  : _('Last error recived, NONE is good')
                }]
            },{
                xtype       : 'textfield',
                name        : 'uniqueid',
                fieldLabel  : _('Unique ID'),
                submitValue : false,
                readOnly    : true,
                plugins    : [{
                    ptype : 'fieldinfo',
                    text  : _('Unique ID used by the webui.')
                }]
            },{
                border : false,
            },{
                xtype       : 'textfield',
                name        : 'jdversion',
                fieldLabel  : _('Jdownloader Version'),
                submitValue : false,
                readOnly    : true,
                plugins    : [{
                    ptype : 'fieldinfo',
                    text  : _('Current Jdownloader version.')
                }]
            },{
                border : false,
            },{
                xtype       : 'textfield',
                name        : 'jdbuilddate',
                fieldLabel  : _('Build Date'),
                submitValue : false,
                readOnly    : true,
                plugins    : [{
                    ptype : 'fieldinfo',
                    text  : _('Date current version was built')
                }]
            },{
                border : false,
            }]
        }];
    },
});

OMV.WorkspaceManager.registerPanel({
    id        : 'settings',
    path      : '/service/jdownloader',
    text      : _('Settings'),
    position  : 10,
    className : 'OMV.module.admin.service.jdownloader.Settings'
});
