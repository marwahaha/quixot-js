<h1>quixot</h1>
<div>[DISCLAIMER: this library is still under development]</div>



<h3><code>.atos</code></h3>
<h4>encode any type of javascript data type (specially numbers) to string </h4>

<ul> Params:
    <li> [data {Number|String|Date|Object|Array|Function} required] </li>
    <li> [string {String} optional] - a string whose characters will be used for encoding </li>
</ul>


<ul> Usage:
      <li> <code> quixot.atos(123456789); /*"mdefghij"*/ </code> </li>
      <li>  <code> quixot.atos(000000); /*"a"*/ </code> </li>
       <li>  <code> quixot.atos('000000'); /*"abcdef"*/ </code> </li>
       <li>  <code> quixot.atos('000000', '!@#$%^&*()+='); /*"!@#$%^"*/ </code> </li>

</ul>


<h3><code>.fingerprint</code></h3>

<h4>main purpose of <code>fingerprint</code> instance is to provide an unique identifier for a given operating system/browser</h4>

<h5>browser scanned features</h5>
<ul>
    <li>
         abreviated time zone
    </li>
    <li>
        unsupported javascript engine features, like Object.keys
    </li>
    <li>
        <code>Math</code> functions and constants (<code>imul</code> support match only for newer browsers)
    </li>
    <li>
        computer name (for IE versions retrieved via ActiveX)
    </li>
    <li>
        installed plugins and supported mime types
        based on the recursive depth scan
    </li>
    <li>
        webgl support, version , vendor, renderer
    </li>
    <li>
        empty canvas dataUrl, both .png and .jpeg format
    </li>
    <li>
        chrome, netscape specific properties
    </li>
    <li>
       screen info (width, height, colorDepth, pixelRation)
    </li>
    <li>
        browser supported css properties
    </li>
    <li>
        unique property names of supported javascript features
        (check the .evilUtors) property
    </li>
    <li>
        the <code> evilUtors </code>  are a set of evaluable strings meant to return sensitive information
        about browser and javascript engine
    </li>
</ul>










<h4 style="font-family: monospace; font-size: 12px; margin: 0px; padding: 0px">registered tests:</h4>
<table style="font-family: monospace; font-size: 12px; margin: 0px; padding: 0px">
<tr>
    <td>
        os/browser
    </td>

    <td>
        details:
    </td>
</tr>

<tr>
    <td>
       Windows	Chrome	55
    </td>

    <td>
       Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.28 Safari/537.36
    </td>
</tr>


<tr>
    <td>
       Windows	Explorer 11
    </td>

    <td>
      Mozilla/5.0 (Windows NT 6.1; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; rv:11.0) like Gecko (computer name detected)
    </td>
</tr>

<tr>
    <td>
       Ubuntu Netscape 5 (Browser)
    </td>

    <td>
        Mozilla/5.0 (Linux; Ubuntu 14.04) AppleWebKit/537.36 Chromium/35.0.1870.2 Safari/537.36
     </td>
</tr>


<tr>
    <td>
       Ubuntu Epiphany 3.18
    </td>

    <td>
       Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/602.1 (KHTML, like Gecko) Version/8.0 Safari/602.1 Ubuntu/16.04 (3.18.5-0ubuntu1) Epiphany/3.18.5
     </td>
</tr>


<tr>
    <td>
       Ubuntu Firefox 40.0
    </td>

    <td>
         Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/53.0.2785.143 Chrome/53.0.2785.143 Safari/537.36
     </td>
</tr>


<tr>
    <td>
       Ubuntu Chromium 53.0.2785.143
    </td>

    <td>
        (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/53.0.2785.143 Chrome/53.0.2785.143 Safari/537.36
    </td>
</tr>

</table>




















