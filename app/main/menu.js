const electron = require( 'electron' );
const Menu     = electron.Menu;

module.exports = {
  init( options ) {
    const template = [
      {
        label   : 'Edit',
        submenu : [
          {
            role : 'undo'
          },
          {
            role : 'redo'
          },
          {
            type : 'separator'
          },
          {
            role : 'cut'
          },
          {
            role : 'copy'
          },
          {
            role : 'paste'
          },
          {
            role : 'delete'
          },
          {
            role : 'selectall'
          }
        ]
      },
      {
        label   : 'View',
        submenu : [
          {
            label       : 'Reload',
            accelerator : 'CmdOrCtrl+R',
            click( item, focusedWindow ) {
              if ( focusedWindow ) focusedWindow.reload();
            }
          },
          {
            role : 'togglefullscreen'
          },
          {
            label       : 'Toggle Developer Tools',
            accelerator : process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
            click( item, focusedWindow ) {
              if ( focusedWindow ) {
                focusedWindow.webContents.toggleDevTools();
              }
            }
          }
        ]
      },
      {
        role    : 'window',
        submenu : [
          {
            role : 'minimize'
          },
          {
            role : 'close'
          }
        ]
      },
      {
        role    : 'help',
        submenu : [
          {
            label : 'Learn More',
            click() { electron.shell.openExternal( 'http://electron.atom.io' ); }
          }
        ]
      }
    ];

    if ( process.platform === 'darwin' ) {
      const name = electron.app.getName();
      template.unshift( {
        label   : name,
        submenu : [
          {
            label : 'About Forrest',
            click() { options.openAboutWindow(); }
          },
          {
            type : 'separator'
          },
          {
            label       : 'Open new window',
            accelerator : 'CmdOrCtrl+N',
            click() { options.createWindow(); }
          },
          {
            type : 'separator'
          },
          {
            label : 'Quit',
            role  : 'quit'
          }
        ]
      } );
      // Window menu.
      template[ 3 ].submenu = [
        {
          label       : 'Close',
          accelerator : 'CmdOrCtrl+W',
          role        : 'close'
        },
        {
          label       : 'Minimize',
          accelerator : 'CmdOrCtrl+M',
          role        : 'minimize'
        },
        {
          label : 'Zoom',
          role  : 'zoom'
        }
      ];
    }

    const menu = Menu.buildFromTemplate( template );

    Menu.setApplicationMenu( menu );
  }
};
