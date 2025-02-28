# indussoft-ui-framework
config driven ui framework

npm i --save-peer react -w @indussoft/indus-idfc-los : for installing peer deps in inner pkgs
npm i --save-dev esbuild@0.17.1 -w @indussoft/indus-idfc-los : for installing dev deps in inner pkgs

git config --global core.autocrlf false


lerna version

git config --global push.default current

lerna --registry https://registry.npmjs.org publish
lerna publish from-git