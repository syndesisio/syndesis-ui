# Backend

The API hasn't been fully documented as of yet, but you can find the current documentation available [here](https://github.com/fabric8io/fabric8-forge/tree/master/fabric8-forge-web). In the meantime, we are adding some information about how to get everything set up so that you can run Hawtio iPaaS as it becomes integrated and increasingly depends on backend services.

For the backend/API repository, please go [here](https://github.com/fabric8io/fabric8-forge).


### Install the VM (Minikube or Minishift)

1. Overall guide from Fabric8 [here](https://fabric8.io/guide/getStarted/minikube.html).
2. For minikube on OS X you want to use xhyve rather than VirtualBox, so you have to set up Docker machine and xhyve, see [here](https://github.com/kubernetes/minikube/blob/master/DRIVERS.md#xhyve-driver).
3. And from the xhyve docs [here](https://github.com/zchee/docker-machine-driver-xhyve#install).

You can quickly install the OSX distro with : `curl -Lo minikube https://storage.googleapis.com/minikube/releases/v0.10.0/minikube-darwin-amd64 && chmod +x minikube && sudo mv minikube /usr/local/bin/` from [here](https://github.com/kubernetes/minikube/releases).

Don't put any of the env vars in your `.bashrc`. Leave it for a seperate environment script that you can source, otherwise those embedded commands will give you problems.


### Start up the VM
You probably want to do `minikube start --vm-driver=xhyve --memory=6000` so the VM has a little more memory than the default. Nowadays it defaults to xhyve, but you can never be too sure.

You may at some point also want to run against Minishift which runs OpenShift rather than vanilla Kubernetes, which has different settings for those variables. At the moment we provide a 'minishift.env' and a 'minikube.env' environment script, so depending on what you're running against, you source either one or the other. The nice thing is it's easy now to try issues against one and then the other.

Once you've run 'minikube' and it's told you it's running, you can then move on to deploying the Fabric8 platform.



### Deploy Fabric8 & Run Fabric8 Console
Install the `gofabric8` binary by following the instructions [here](https://github.com/fabric8io/gofabric8#install--update--run). If you are on OS X, you want the 'Darwin' option.

Download it and overlay your existing one, if applicable. The `gofabric8` binary nowadays should just use the settings in `~/.kube/config`. It's a binary for installing the fabric8 platform. No need to worry about the sha256. Just rename that 'gofabric8' and put it in /usr/local/bin or whatever.

Run: `gofabric8 deploy -y --console --app=cd-pipeline`

That will deploy the Fabric8 platform and eventually open up the Fabric8 console in your browser. You should see the following in the terminal:

```
Default GOGS admin username/password = gogsadmin/RedHat$1
Downloading images and waiting to open the fabric8 console...

Opening URL http://192.168.64.3:31868
```


### Set Env Vars for Minikube or Minishift

Once you have the fabric8-console up and running, you're ready to open a terminal and source your minikube.env script, or minishift.env script if you want to run Minishift instead. We didn't get as far as we would have liked to fetch buildconfigs from Kubernetes, so you have to source it manually:

`source ~/Dropbox/bin/minikube.env`
`source ~/Dropbox/bin/minishift.env`

If you're developing for fabric8-console, then run `gulp` in your local git clone of fabric8-console.

If you're developing for or want to run iPaaS, proceed to the next step.


### Run iPaaS & Initial Setup

1. Once you have Minikube (or Minishift) and the Fabric8 platform running, Run `npm start` from your local git clone of hawtio-ipaas.
2. Within the fabric8-console that should have been running once you deployed Fabric8 (if not, see previous step), create a Team as follows.
  1. On the first page of the 'Create Team' wizard, select 'existing namespace'.
  2. Select 'default' and press 'Next'.
  3. When prompted to run 'cd-pipeline' don't do that and just click 'exit' or 'finish'. That'll put you back on the front page of the console.
3. Next you'll want to create a Project.
  1. From the front page of the console, go into the 'Team Dashboard'.
  2. From there, you can create a Project.
4. Click on the 'Forge' link and you should finally be able to see the Forge UI in the Fabric8 console. You can get data on that page. It should look amazingly similar to what we're doing in hawtio-ipaas. There's actually a crappy connection browser in the Fabric8 console which you can get to from the Camel editor.


### Running iPaaS Day-to-Day
1. If you aren't already, start up Minikube: `minikube start --vm-driver=xhyve --memory=6000`
2. Make sure you've already set up a Team and Project on the Fabric8 console, as directed above.
3. If you aren't already, start up Fabric8: ``
4. Run `npm start` from your git clone of hawtio-ipaas.
5. Open up `localhost:1337` in your browser.


