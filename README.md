# cancerresearchuk-pybossa

## Overview

This repository contains all the code needed to install and run the [Cancer Research UK](http://www.cancerresearchuk.org/) 
funded Citizen Science project within a [pybossa](http://pybossa.com/) server. 

## Running your own pybossa server using vagrant

###### Clone the pybossa repo
```
$ git clone --recursive https://github.com/PyBossa/pybossa.git
```

###### Edit the VagrantFile to include the image, styles and scripts needed to run the project
Edit the `VagrantFile` from within the pybossa directory created following the repo clone.

Inside the `Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|` block before the `end` statement, add the following
two lines. Note that they should be indented.

```
    # Config required to link the CRUK static assets to the CRUK project
    config.vm.synced_folder "[PATH_TO_DIRECTORY_CONTAINING_THIS_README_FILE]/assets/trailblazer", "/vagrant/pybossa/themes/default/static/trailblazer"
```

###### Start Vagrant
```
$ cd pybossa
$ vagrant up
```

###### Create an Account on pybossa
- Go to `http://localhost:5000`
- Click `sign in` then `create an account`
- Enter the details needed to create an account
- Complete creating an account but clicking `create an account`

###### Take note of your api key
- Click on the user icon in the top right of pybossa
- Choose `My Profile` from the drop down menu
- Copy and save the `API Key` shown on your profile page

###### Upload the CRUK Project to pybossa
Starting from the directory where this readme file is located:

Note: the location of your python2.7 executable may be different

```
$ cd project
$ virtualenv -p /usr/bin/python2.7 env
$ source env/bin/activate
$ pip install -r requirements.txt
$ pbs --server http://localhost:5000 --api-key [YOUR_API_KEY_HERE] create_project
$ pbs --server http://localhost:5000 --api-key [YOUR_API_KEY_HERE] add_tasks --tasks-file docs/lung-egfr-metadata.csv
$ pbs --server http://localhost:5000 --api-key [YOUR_API_KEY_HERE] update_project
```

###### Visit pybossa and publish your project
- Go to `http://localhost:5000`
- Click on `projects` in the top nav
- Click on `draft` in the left hand nav
- Choose your project
- Click the `You can now publish it` button
- Confirm by clicking `yes publish`
- Click the `contribute now` button to start contributing

## Copyright / Licence

Copyright 2016 Cancer Research UK

Source Code License: The GNU Affero General Public License, either version 3 of the License or (at your option) any later version. (See agpl.txt file)

The GNU Affero General Public License is a free, copyleft license for software and other kinds of works, specifically designed to ensure 
cooperation with the community in the case of network server software.

Documentation is under a Creative Commons Attribution Noncommercial License version 3.