

var exec = require('child_process').execSync

exec('cd ..')
exec('git add .')
let argv = process.argv.splice(2)
if (argv.length > 0) {
    exec('git commit -m ' + argv[0])
}else {
    exec('git commit')
}
exec('git push')


