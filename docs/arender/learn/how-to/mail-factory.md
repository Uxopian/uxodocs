---
title: "Resolve mail conversion issue"
---







You probably have a configuration problem related to wkhtmltopdf.

## Advanced configuration

If on Windows, the unit conversion does not work, look at the Windows
error message if you have one, this may indicate a potential lack of
framework. (.NET, Visual Studio Redistributable, etc..)

If on Linux, the conversion does not happen with an error indicating an
X server problem, you need to install the xvfb package and make the
following commands in your linux (adapting them to your wkhtmltopdf
installation)

``` bash
mv /usr/bin/wkhtmltopdf /usr/bin/wkhtmltopdf_nohead
cp wkhtmltopdf_xvfb /usr/bin/wkhtmltopdf
chmod a+x /usr/bin/wkhtmltopdf
```

The contents of the wkhtmltopdf_xvfb file are as follows:

``` bash
#!/bin/bash
xvfb-run -a -s "-screen 0 640x480x16" /usr/bin/wkhtmltopdf_nohead "$@"
```

If the error is related to a network problem when retrieving the images
from the mail, it is then up to you to decide whether you want to allow
the rendition server to connect to the net to recover these images or to
give wkhtmltopdf in the configuration of the rendition server a proxy
that will resolve authorized URLs and block others (a proxy blocking all
the images is possible but the rendering will be degraded).
