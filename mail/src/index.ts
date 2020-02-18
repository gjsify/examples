import '../@types/Gjs/index'

// const console = require('console');

// const http = require('http');

// http.get('http://www.hahaha.de/witze/zufallswitz.txt.php', (resp) => {
//   console.log(resp)
// });

console.log('hello world');

const test = '';

const Gtk = imports.gi.Gtk;

Gtk.init(null)

const win = new Gtk.Window()
win.connect('destroy', () => Gtk.main_quit())
win.connect('delete-event', () => false)

win.set_default_size(200, 80)
win.add(new Gtk.Label({ label: 'Hello Gtk+' }))

win.show_all()
Gtk.main()

