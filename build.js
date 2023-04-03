import fs from 'fs'

fs.writeFile('CNAME', 'go-games.surge.sh', function (err) {
  if (err) throw err
  fs.rename('./CNAME', './dist/CNAME', function (err) {
    if (err) throw err
    console.log('Moved CNAME to dist folder')
  })
})


fs.copyFile("./dist/index.html", './dist/200.html', fs.constants.COPYFILE_FICLONE, function (err) {
  if(err) {
    console.log(err)
  } 
  else {
    console.log('success create 400 file')
  }
})