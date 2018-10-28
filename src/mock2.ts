export default `
<html class="gr__bl_ocks_org"><head><meta charset="utf-8">
<meta name="viewport" content="width=1000">
<meta name="twitter:card" content="summary">
<meta name="twitter:site" content="@mbostock">
<meta property="og:url" content="http://bl.ocks.org/sathomas/191a8a302a363ac6a4b0">
<meta property="og:title" content="Understanding D3.js Force Layout - 8: gravity">
<meta property="og:description" content="Stephen A Thomas’s Block 191a8a302a363ac6a4b0">
<meta property="og:image" content="http://bl.ocks.org/sathomas/raw/191a8a302a363ac6a4b0/eaeadfb9e869b7e0e90e138d62e9a643f3f8ca65/thumbnail.png">
<title>Understanding D3.js Force Layout - 8: gravity - bl.ocks.org</title>
<link rel="icon" href="/favicon.png">
<link rel="canonical" href="http://bl.ocks.org/sathomas/191a8a302a363ac6a4b0">
<style>

@import url("/style.css");

</style>


</head><body data-gr-c-s-loaded="true" style=""><header>
  <div class="column">
    <div class="navigation">
      <a href="/">Popular</a>
      / <a href="/-/about">About</a>
    </div>
    <a class="user" href="/sathomas"><img class="avatar" src="https://avatars3.githubusercontent.com/u/1731910?v=4&amp;s=60" width="30" height="30">Stephen A Thomas</a>’s
    Block <a class="gist gist-id self" title="View Gist on GitHub." href="https://gist.github.com/sathomas/191a8a302a363ac6a4b0">191a8a302a363ac6a4b0</a>    <div class="date">Updated July 22, 2016</div>
  </div>
</header>

<div class="column">
  <h1>Understanding D3.js Force Layout - 8: gravity</h1>
  <div class="index">
    <iframe sandbox="allow-popups allow-scripts allow-forms allow-same-origin" src="/sathomas/raw/191a8a302a363ac6a4b0/eaeadfb9e869b7e0e90e138d62e9a643f3f8ca65/" marginwidth="0" marginheight="0" style="height:500px;" scrolling="no"></iframe>
  </div>
  <div class="index-pop">
    <a target="_blank" title="Open Block 191a8a302a363ac6a4b0 a new window." href="/sathomas/raw/191a8a302a363ac6a4b0">Open<svg height="16" width="12"><path d="M11 10h1v3c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V3c0-0.55 0.45-1 1-1h3v1H1v10h10V10zM6 2l2.25 2.25-3.25 3.25 1.5 1.5 3.25-3.25 2.25 2.25V2H6z"></path></svg></a>
  </div>
  <div class="gist-readme" data-key="README.md"><p>This is part of a series of examples that describe the basic operation of <br>
the <a href="http://d3js.org">D3.js</a> <a href="https://github.com/mbostock/d3/wiki/Force-Layout">force layout</a>.<br>
Eventually they may end up in a blog post that wraps everything together.<br>
If you missed the beginning of the series, here's a link to <br>
<a href="http://jsdatav.is/visuals.html?id=11550728">first example</a>.</p>
<p>The code in the previous examples has mentioned a property that D3 calls<br>
<em>gravity.</em> The force layout uses this property to keep nodes from wandering<br>
off the edges of the visualization, something they might otherwise do to<br>
avoid overlap.</p>
<p>Unlike properties from the other examples, <code class="hljs">gravity</code> applies to the<br>
entire force layout and not individual links or nodes. To illustrate its<br>
effect, therefore, this example creates two separate visualizations that<br>
happen to reside (unbeknownst to each other) in the same SVG container.<br>
To make this as clear as possible, the code is not at all optimized;<br>
instead, it consists of one force layout copied and pasted as a second<br>
one. The only difference between the two is the color (blue vs. red)<br>
and the fact that the red layout has disabled the <code class="hljs">gravity</code> property<br>
by setting it to 0. (Another insignificant difference is that the<br>
initial positions are inverted. That's just to help see what's happening,<br>
and the positions are otherwise symmetrical.)</p>
<p>Use the controls in the upper left to execute the layout and see the<br>
different behaviors. Notice that the blue layout, with gravity enabled,<br>
tends to draw all the nodes to the center of the container. The red<br>
nodes feel no such compulsion and are free to drift off the visualization<br>
entirely.</p>
<p><a href="http://jsdatav.is/visuals.html?id=9041d7cb311a729e62f3">Further examples</a><br>
will consider some of the other properties of the force layout.</p></div>
  <div class="gist-sources">
    <div class="gist-source" data-key="index.html">
      <h2>index.html<a name="index.html" class="anchor" href="#index.html">#</a></h2>
      <pre><code class="html hljs xml"><span class="meta">&lt;!DOCTYPE html&gt;</span>
<span class="tag">&lt;<span class="name">html</span>&gt;</span>
<span class="tag">&lt;<span class="name">head</span>&gt;</span>
    <span class="tag">&lt;<span class="name">meta</span> <span class="attr">charset</span>=<span class="string">'utf-8'</span>&gt;</span>
    <span class="tag">&lt;<span class="name">title</span>&gt;</span>Force Layout Example 8<span class="tag">&lt;/<span class="name">title</span>&gt;</span>
    <span class="tag">&lt;<span class="name">link</span> <span class="attr">href</span>=<span class="string">"http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css"</span>
          <span class="attr">rel</span>=<span class="string">"stylesheet"</span>&gt;</span>
    <span class="tag">&lt;<span class="name">style</span>&gt;</span><span class="css">

<span class="selector-class">.node1</span> {
    <span class="attribute">fill</span>: <span class="number">#0000cc</span>;
    <span class="attribute">stroke</span>: <span class="number">#fff</span>;
    <span class="attribute">stroke-width</span>: <span class="number">2px</span>;
}

<span class="selector-class">.node2</span> {
    <span class="attribute">fill</span>: <span class="number">#cc0000</span>;
    <span class="attribute">stroke</span>: <span class="number">#fff</span>;
    <span class="attribute">stroke-width</span>: <span class="number">2px</span>;
}

<span class="selector-class">.link1</span> {
    <span class="attribute">stroke</span>: <span class="number">#0000aa</span>;
    <span class="attribute">stroke-width</span>: <span class="number">1px</span>;
}

<span class="selector-class">.link2</span> {
    <span class="attribute">stroke</span>: <span class="number">#aa0000</span>;
    <span class="attribute">stroke-width</span>: <span class="number">1px</span>;
}

<span class="selector-tag">button</span> {
    <span class="attribute">position</span>: absolute;
    <span class="attribute">width</span>: <span class="number">30px</span>;
}
<span class="selector-tag">button</span><span class="selector-id">#slow</span> {
    <span class="attribute">margin-top</span>: <span class="number">28px</span>;
}
<span class="selector-tag">button</span><span class="selector-id">#play</span> {
    <span class="attribute">margin-top</span>: <span class="number">54px</span>;
}
<span class="selector-tag">button</span><span class="selector-id">#reset</span> {
    <span class="attribute">margin-top</span>: <span class="number">80px</span>;
}

    </span><span class="tag">&lt;/<span class="name">style</span>&gt;</span>
<span class="tag">&lt;/<span class="name">head</span>&gt;</span>
<span class="tag">&lt;<span class="name">body</span>&gt;</span>
    <span class="tag">&lt;<span class="name">button</span> <span class="attr">id</span>=<span class="string">'advance'</span> <span class="attr">title</span>=<span class="string">'Advance Layout One Increment'</span>&gt;</span>
        <span class="tag">&lt;<span class="name">i</span> <span class="attr">class</span>=<span class="string">'fa fa-step-forward'</span>&gt;</span><span class="tag">&lt;/<span class="name">i</span>&gt;</span>
    <span class="tag">&lt;/<span class="name">button</span>&gt;</span>
    <span class="tag">&lt;<span class="name">button</span> <span class="attr">id</span>=<span class="string">'slow'</span> <span class="attr">title</span>=<span class="string">'Run Layout in Slow Motion'</span>&gt;</span>
        <span class="tag">&lt;<span class="name">i</span> <span class="attr">class</span>=<span class="string">'fa fa-play'</span>        &gt;</span><span class="tag">&lt;/<span class="name">i</span>&gt;</span>
    <span class="tag">&lt;/<span class="name">button</span>&gt;</span>
    <span class="tag">&lt;<span class="name">button</span> <span class="attr">id</span>=<span class="string">'play'</span> <span class="attr">title</span>=<span class="string">'Run Layout at Full Speed'</span>&gt;</span>
        <span class="tag">&lt;<span class="name">i</span> <span class="attr">class</span>=<span class="string">'fa fa-fast-forward'</span>&gt;</span><span class="tag">&lt;/<span class="name">i</span>&gt;</span>
    <span class="tag">&lt;/<span class="name">button</span>&gt;</span>
    <span class="tag">&lt;<span class="name">button</span> <span class="attr">id</span>=<span class="string">'reset'</span> <span class="attr">title</span>=<span class="string">'Reset Layout to Beginning'</span>&gt;</span>
        <span class="tag">&lt;<span class="name">i</span> <span class="attr">class</span>=<span class="string">'fa fa-undo'</span>&gt;</span><span class="tag">&lt;/<span class="name">i</span>&gt;</span>
    <span class="tag">&lt;/<span class="name">button</span>&gt;</span>

    <span class="tag">&lt;<span class="name">script</span> <span class="attr">src</span>=<span class="string">'http://d3js.org/d3.v3.min.js'</span>&gt;</span><span class="undefined"></span><span class="tag">&lt;/<span class="name">script</span>&gt;</span>
    <span class="tag">&lt;<span class="name">script</span>&gt;</span><span class="tag">&lt;/<span class="name">script</span>&gt;</span>
<span class="tag">&lt;/<span class="name">body</span>&gt;</span>
<span class="tag">&lt;/<span class="name">html</span>&gt;</span>
</code></pre>
    </div>
  </div>
  <div class="gist-license">
    <h2>LICENSE<a name="license" class="anchor" href="#license">#</a></h2>
    This block appears to have <a target="_blank" href="http://choosealicense.com/no-license/">no license</a>. Please contact <a target="_blank" href="https://github.com/sathomas">the author</a> to request a license.
  </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/d3-array/1.2.1/d3-array.min.js" integrity="sha384-c+16cUIc0b/tqEZ9mRvDfI/r1Dg1Yq3JpWgZFW4mjN2QU7XXFWVB90PDFlV8SIAm" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3-collection/1.0.4/d3-collection.min.js" integrity="sha384-H/Didu3qLpyrVmUqlvWapaxyhCzc+anaMa9uw+CHWHu+GNfClr91w8QgiLFIp7/V" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3-dispatch/1.0.3/d3-dispatch.min.js" integrity="sha384-dGRK/lIqGrmmAoVA9K4pwKI4YL4BxIpaGa1dwU6lcRdpp5OJR6FoMZqxqzvCzFBS" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3-request/1.0.6/d3-request.min.js" integrity="sha384-xsZEl8WRzIEBs+gkv/88ttcv7hmGnFJX8t8k6V+fZcrG2y5o1SXsCRLzl2S9HkFU" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3-selection/1.1.0/d3-selection.min.js" integrity="sha384-AOxWgfcHKw/K6u7UX8IJ4vy418+zXnA6wB6P4/sobPFG0mM34UlLPHELGvI+aEX5" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/showdown/1.8.1/showdown.min.js" integrity="sha384-Mcx6WhltjdlkIwTWetAJIBNgD0lLtUcl//A7Ksp/vmVZVD2rzQ949wtmoehrDJd/" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js" integrity="sha256-/BfiIkHlHoVihZdc6TFuj7MmJ0TWcWsMXkeDFwhi0zw=" crossorigin="anonymous"></script>
<script>

hljs.configure({classPrefix: ""});
showdown.setFlavor("github");

var gist = {"public":true,"protocol":"http","sha":"eaeadfb9e869b7e0e90e138d62e9a643f3f8ca65","files":{"README.md":{"language":"Markdown","type":"text/plain","filename":"README.md","size":1788,"sha":"f746bca14ddcdd51596278be7d7c0461beadd35d"},"index.html":{"language":"HTML","type":"text/html","filename":"index.html","size":16283,"sha":"7f6810fe79bbe2648f105744c39d6ad4cda2444e"},"thumbnail.png":{"language":null,"type":"image/png","filename":"thumbnail.png","size":16435,"sha":"fd064c4aa0ec2d9f0552500e582b60ea0c145754"}},"created_at":"2014-05-15T09:39:45Z","updated_at":"2016-07-22T20:38:31Z","description":"Understanding D3.js Force Layout - 8: gravity","owner":{"login":"sathomas"},"id":"191a8a302a363ac6a4b0"};

var files = d3.values(gist.files);

d3.select(".gist-readme")
  .data(files, function(d) { return d ? d.filename : this.getAttribute("data-key"); })
    .each(function(d) {
      var readme = d3.select(this);
      d3.text("/sathomas/raw/191a8a302a363ac6a4b0/eaeadfb9e869b7e0e90e138d62e9a643f3f8ca65/" + d.filename, function(error, content) {
        if (error) content = "Sorry, an error occurred.";
        readme.html(new showdown.Converter().makeHtml(content));
        readme.selectAll("code").each(function() { hljs.highlightBlock(this); });
      });
    });

d3.selectAll(".gist-source")
  .data(files, function(d) { return d ? d.filename : this.getAttribute("data-key"); })
  .select("code")
    .attr("class", function(d) { return d.language && (d.language === "JSON" ? "javascript" : d.language.toLowerCase()); })
    .each(function(d) {
      var code = d3.select(this);
      d3.text("/sathomas/raw/191a8a302a363ac6a4b0/eaeadfb9e869b7e0e90e138d62e9a643f3f8ca65/" + (d.filename === "index.html" ? "" : d.filename), function(error, content) {
        if (error) content = "Sorry, an error occurred.";
        code.text(content);
        hljs.highlightBlock(code.node());
      });
    });

</script>

<script>

GoogleAnalyticsObject = "ga", ga = function() { ga.q.push(arguments); }, ga.q = [], ga.l = +new Date;
ga("create", "UA-48272912-1", "auto");
ga("send", "pageview");

</script>
<script async="" src="//www.google-analytics.com/analytics.js"></script>
</body></html>`;
