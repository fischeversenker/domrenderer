export default `<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Using Pre-Processors | Vue Loader</title>
    <meta name="description" content="Webpack loader for single-file Vue components">

    <link rel="preload" href="/assets/css/0.styles.043dd199.css" as="style"><link rel="preload" href="/assets/js/app.a951c26d.js" as="script"><link rel="preload" href="/assets/js/13.a2c136f9.js" as="script"><link rel="prefetch" href="/assets/js/23.6a5f614a.js"><link rel="prefetch" href="/assets/js/2.2eacc74f.js"><link rel="prefetch" href="/assets/js/3.bea65010.js"><link rel="prefetch" href="/assets/js/4.2ebfdab1.js"><link rel="prefetch" href="/assets/js/5.45379607.js"><link rel="prefetch" href="/assets/js/6.576ef7c8.js"><link rel="prefetch" href="/assets/js/7.093c0b1b.js"><link rel="prefetch" href="/assets/js/8.a45589c7.js"><link rel="prefetch" href="/assets/js/9.b0eeb67e.js"><link rel="prefetch" href="/assets/js/10.1e7527c7.js"><link rel="prefetch" href="/assets/js/11.e01fd78a.js"><link rel="prefetch" href="/assets/js/12.7d2e9594.js"><link rel="prefetch" href="/assets/js/14.3340bf83.js"><link rel="prefetch" href="/assets/js/15.cffe1615.js"><link rel="prefetch" href="/assets/js/16.b95c4e76.js"><link rel="prefetch" href="/assets/js/17.0a317eea.js"><link rel="prefetch" href="/assets/js/18.da51c9cc.js"><link rel="prefetch" href="/assets/js/19.19996405.js"><link rel="prefetch" href="/assets/js/20.f138a866.js"><link rel="prefetch" href="/assets/js/21.c68d2490.js"><link rel="prefetch" href="/assets/js/22.964080f4.js"><link rel="prefetch" href="/assets/js/24.4b73a954.js"><link rel="prefetch" href="/assets/js/25.4bc50e6a.js"><link rel="prefetch" href="/assets/js/26.7bd7351a.js"><link rel="prefetch" href="/assets/js/27.11b52fa5.js"><link rel="prefetch" href="/assets/js/28.7985a903.js"><link rel="prefetch" href="/assets/js/29.5a685843.js"><link rel="prefetch" href="/assets/js/30.63f43af7.js"><link rel="prefetch" href="/assets/js/31.bddccb9c.js"><link rel="prefetch" href="/assets/js/32.608479d5.js"><link rel="prefetch" href="/assets/js/33.8f17bbfc.js"><link rel="prefetch" href="/assets/js/34.c53ba90f.js"><link rel="prefetch" href="/assets/js/35.a72a3dbc.js"><link rel="prefetch" href="/assets/js/36.bebe7b00.js"><link rel="prefetch" href="/assets/js/37.1b33111c.js"><link rel="prefetch" href="/assets/js/38.88959c7e.js"><link rel="prefetch" href="/assets/js/39.bd1bb3b8.js"><link rel="prefetch" href="/assets/js/40.570255c0.js"><link rel="prefetch" href="/assets/js/41.b7439ae5.js"><link rel="prefetch" href="/assets/js/42.17b9474b.js"><link rel="prefetch" href="/assets/js/43.c7a59651.js"><link rel="prefetch" href="/assets/js/44.f616c699.js"><link rel="prefetch" href="/assets/js/45.5c687b4d.js"><link rel="prefetch" href="/assets/js/46.56842d21.js"><link rel="prefetch" href="/assets/js/47.bc23a673.js"><link rel="prefetch" href="/assets/js/48.3c7e72b6.js">
    <link rel="stylesheet" href="/assets/css/0.styles.043dd199.css">
  </head>
  <body>
    <div id="app" data-server-rendered="true"><div class="theme-container"><header class="navbar"><div class="sidebar-button"><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" viewBox="0 0 448 512" class="icon"><path fill="currentColor" d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"></path></svg></div> <a href="/" class="home-link router-link-active"><!----> <span class="site-name">Vue Loader</span></a> <div class="links" style="max-width:nullpx;"><div class="search-box"><input aria-label="Search" autocomplete="off" spellcheck="false" value=""> <!----></div> <nav class="nav-links can-hide"><div class="nav-item"><a href="/guide/" class="nav-link router-link-active">Guide</a></div><div class="nav-item"><a href="/spec.html" class="nav-link">SFC Spec</a></div><div class="nav-item"><a href="/options.html" class="nav-link">Options Reference</a></div><div class="nav-item"><a href="/migrating.html" class="nav-link">Migrating from v14</a></div><div class="nav-item"><div class="dropdown-wrapper"><a class="dropdown-title"><span class="title">Languages</span> <span class="arrow right"></span></a> <ul class="nav-dropdown" style="display:none;"><li class="dropdown-item"><!----> <a href="/guide/pre-processors.html" class="nav-link router-link-exact-active router-link-active">English</a></li><li class="dropdown-item"><!----> <a href="/zh/guide/pre-processors.html" class="nav-link">简体中文</a></li><li class="dropdown-item"><!----> <a href="/ru/guide/pre-processors.html" class="nav-link">Русский</a></li></ul></div></div> <a href="https://github.com/vuejs/vue-loader" target="_blank" rel="noopener noreferrer" class="repo-link">
    GitHub
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" x="0px" y="0px" viewBox="0 0 100 100" width="15" height="15" class="icon outbound"><path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path> <polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon></svg></a></nav></div></header> <div class="sidebar-mask"></div> <div class="sidebar"><nav class="nav-links"><div class="nav-item"><a href="/guide/" class="nav-link router-link-active">Guide</a></div><div class="nav-item"><a href="/spec.html" class="nav-link">SFC Spec</a></div><div class="nav-item"><a href="/options.html" class="nav-link">Options Reference</a></div><div class="nav-item"><a href="/migrating.html" class="nav-link">Migrating from v14</a></div><div class="nav-item"><div class="dropdown-wrapper"><a class="dropdown-title"><span class="title">Languages</span> <span class="arrow right"></span></a> <ul class="nav-dropdown" style="display:none;"><li class="dropdown-item"><!----> <a href="/guide/pre-processors.html" class="nav-link router-link-exact-active router-link-active">English</a></li><li class="dropdown-item"><!----> <a href="/zh/guide/pre-processors.html" class="nav-link">简体中文</a></li><li class="dropdown-item"><!----> <a href="/ru/guide/pre-processors.html" class="nav-link">Русский</a></li></ul></div></div> <a href="https://github.com/vuejs/vue-loader" target="_blank" rel="noopener noreferrer" class="repo-link">
    GitHub
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" x="0px" y="0px" viewBox="0 0 100 100" width="15" height="15" class="icon outbound"><path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path> <polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon></svg></a></nav> <div class="carbon-ads"></div> <ul class="sidebar-links"><li><a href="/" class="sidebar-link">Introduction</a></li><li><a href="/guide/" class="sidebar-link">Getting Started</a></li><li><a href="/guide/asset-url.html" class="sidebar-link">Asset URL Handling</a></li><li><a href="/guide/pre-processors.html" class="active sidebar-link">Using Pre-Processors</a><ul class="sidebar-sub-headers"><li class="sidebar-sub-header"><a href="/guide/pre-processors.html#sass" class="sidebar-link">SASS</a><ul class="sidebar-sub-headers"><li class="sidebar-sub-header"><a href="/guide/pre-processors.html#sass-vs-scss" class="sidebar-link">SASS vs SCSS</a></li><li class="sidebar-sub-header"><a href="/guide/pre-processors.html#sharing-global-variables" class="sidebar-link">Sharing Global Variables</a></li></ul></li><li class="sidebar-sub-header"><a href="/guide/pre-processors.html#less" class="sidebar-link">LESS</a></li><li class="sidebar-sub-header"><a href="/guide/pre-processors.html#stylus" class="sidebar-link">Stylus</a></li><li class="sidebar-sub-header"><a href="/guide/pre-processors.html#postcss" class="sidebar-link">PostCSS</a></li><li class="sidebar-sub-header"><a href="/guide/pre-processors.html#babel" class="sidebar-link">Babel</a><ul class="sidebar-sub-headers"><li class="sidebar-sub-header"><a href="/guide/pre-processors.html#excluding-node-modules" class="sidebar-link">Excluding node_modules</a></li></ul></li><li class="sidebar-sub-header"><a href="/guide/pre-processors.html#typescript" class="sidebar-link">TypeScript</a></li><li class="sidebar-sub-header"><a href="/guide/pre-processors.html#pug" class="sidebar-link">Pug</a></li></ul></li><li><a href="/guide/scoped-css.html" class="sidebar-link">Scoped CSS</a></li><li><a href="/guide/css-modules.html" class="sidebar-link">CSS Modules</a></li><li><a href="/guide/hot-reload.html" class="sidebar-link">Hot Reload</a></li><li><a href="/guide/functional.html" class="sidebar-link">Functional Components</a></li><li><a href="/guide/custom-blocks.html" class="sidebar-link">Custom Blocks</a></li><li><a href="/guide/extract-css.html" class="sidebar-link">CSS Extraction</a></li><li><a href="/guide/linting.html" class="sidebar-link">Linting</a></li><li><a href="/guide/testing.html" class="sidebar-link">Testing</a></li></ul> </div> <div class="page"> <div class="content"><h1 id="using-pre-processors"><a href="#using-pre-processors" aria-hidden="true" class="header-anchor">#</a> Using Pre-Processors</h1> <p>In webpack, all pre-processors need to be applied with a corresponding loader. <code>vue-loader</code> allows you to use other webpack loaders to process a part of a Vue component. It will automatically infer the proper loaders to use based on the <code>lang</code> attribute of a language block and the rules in your webpack config.</p> <h2 id="sass"><a href="#sass" aria-hidden="true" class="header-anchor">#</a> SASS</h2> <p>For example, to compile our <code>&lt;style&gt;</code> tag with SASS/SCSS:</p> <div class="language-bash extra-class"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> -D sass-loader node-sass
</code></pre></div><p>In your webpack config:</p> <div class="language-js extra-class"><pre class="language-js"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  module<span class="token punctuation">:</span> <span class="token punctuation">{</span>
    rules<span class="token punctuation">:</span> <span class="token punctuation">[</span>
      <span class="token comment">// ... other rules omitted</span>

      <span class="token comment">// this will apply to both plain smthg files</span>
      <span class="token comment">// AND smthg blocks in smthg files</span>
      <span class="token punctuation">{</span>
        test<span class="token punctuation">:</span> <span class="token regex">/\.scss$/</span><span class="token punctuation">,</span>
        use<span class="token punctuation">:</span> <span class="token punctuation">[</span>
          <span class="token string">'vue-style-loader'</span><span class="token punctuation">,</span>
          <span class="token string">'css-loader'</span><span class="token punctuation">,</span>
          <span class="token string">'sass-loader'</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// plugin omitted</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Now in addition to being able to <code>import 'style.scss'</code>, we can use SCSS in Vue components as well:</p> <div class="language-html extra-class"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">&quot;</span>scss<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token style language-css">
<span class="token comment">/* write SCSS here */</span>
</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>Any content inside the block will be processed by webpack as if it's inside a <code>*.scss</code> file.</p> <h3 id="sass-vs-scss"><a href="#sass-vs-scss" aria-hidden="true" class="header-anchor">#</a> SASS vs SCSS</h3> <p>Note that <code>sass-loader</code> processes the non-indent-based <code>scss</code> syntax by default. In order to use the indent-based <code>sass</code> syntax, you need to pass options to the loader:</p> <div class="language-js extra-class"><pre class="language-js"><code><span class="token comment">// webpack.config.js -&gt; module.rules</span>
<span class="token punctuation">{</span>
  test<span class="token punctuation">:</span> <span class="token regex">/\.sass$/</span><span class="token punctuation">,</span>
  use<span class="token punctuation">:</span> <span class="token punctuation">[</span>
    <span class="token string">'vue-style-loader'</span><span class="token punctuation">,</span>
    <span class="token string">'css-loader'</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      loader<span class="token punctuation">:</span> <span class="token string">'sass-loader'</span><span class="token punctuation">,</span>
      options<span class="token punctuation">:</span> <span class="token punctuation">{</span>
        indentedSyntax<span class="token punctuation">:</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="sharing-global-variables"><a href="#sharing-global-variables" aria-hidden="true" class="header-anchor">#</a> Sharing Global Variables</h3> <p><code>sass-loader</code> also supports a <code>data</code> option which allows you to share common variables among all processed files without having to explicit import them:</p> <div class="language-js extra-class"><pre class="language-js"><code><span class="token comment">// webpack.config.js -&gt; module.rules</span>
<span class="token punctuation">{</span>
  test<span class="token punctuation">:</span> <span class="token regex">/\.scss$/</span><span class="token punctuation">,</span>
  use<span class="token punctuation">:</span> <span class="token punctuation">[</span>
    <span class="token string">'vue-style-loader'</span><span class="token punctuation">,</span>
    <span class="token string">'css-loader'</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      loader<span class="token punctuation">:</span> <span class="token string">'sass-loader'</span><span class="token punctuation">,</span>
      options<span class="token punctuation">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// you can also read from a file, e.g.smthg</span>
        data<span class="token punctuation">:</span> <span class="token template-string"><span class="token string">smthg</span></span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="less"><a href="#less" aria-hidden="true" class="header-anchor">#</a> LESS</h2> <div class="language-bash extra-class"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> -D <span class="token function">less</span> less-loader
</code></pre></div><div class="language-js extra-class"><pre class="language-js"><code><span class="token comment">// webpack.config.js -&gt; module.rules</span>
<span class="token punctuation">{</span>
  test<span class="token punctuation">:</span> <span class="token regex">/\.less$/</span><span class="token punctuation">,</span>
  use<span class="token punctuation">:</span> <span class="token punctuation">[</span>
    <span class="token string">'vue-style-loader'</span><span class="token punctuation">,</span>
    <span class="token string">'css-loader'</span><span class="token punctuation">,</span>
    <span class="token string">'less-loader'</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="stylus"><a href="#stylus" aria-hidden="true" class="header-anchor">#</a> Stylus</h2> <div class="language-bash extra-class"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> -D stylus stylus-loader
</code></pre></div><div class="language-js extra-class"><pre class="language-js"><code><span class="token comment">// webpack.config.js -&gt; module.rules</span>
<span class="token punctuation">{</span>
  test<span class="token punctuation">:</span> <span class="token regex">/\.styl(us)?$/</span><span class="token punctuation">,</span>
  use<span class="token punctuation">:</span> <span class="token punctuation">[</span>
    <span class="token string">'vue-style-loader'</span><span class="token punctuation">,</span>
    <span class="token string">'css-loader'</span><span class="token punctuation">,</span>
    <span class="token string">'stylus-loader'</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="postcss"><a href="#postcss" aria-hidden="true" class="header-anchor">#</a> PostCSS</h2> <div class="tip custom-block"><p class="custom-block-title">TIP</p> <p>Vue Loader v15 no longer applies PostCSS transforms by default. You will need to use PostCSS via <code>postcss-loader</code>.</p></div> <div class="language-bash extra-class"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> -D postcss-loader
</code></pre></div><div class="language-js extra-class"><pre class="language-js"><code><span class="token comment">// webpack.config.js -&gt; module.rules</span>
<span class="token punctuation">{</span>
  test<span class="token punctuation">:</span> <span class="token regex">/\.css$/</span><span class="token punctuation">,</span>
  use<span class="token punctuation">:</span> <span class="token punctuation">[</span>
    <span class="token string">'vue-style-loader'</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      loader<span class="token punctuation">:</span> <span class="token string">'css-loader'</span><span class="token punctuation">,</span>
      options<span class="token punctuation">:</span> <span class="token punctuation">{</span> importLoaders<span class="token punctuation">:</span> <span class="token number">1</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token string">'postcss-loader'</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Configuration of PostCSS can be done via <code>postcss.config.js</code> or <code>postcss-loader</code> options. For details, consult <a href="https://github.com/postcss/postcss-loader" target="_blank" rel="noopener noreferrer">postcss-loader docs<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" x="0px" y="0px" viewBox="0 0 100 100" width="15" height="15" class="icon outbound"><path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path> <polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon></svg></a>.</p> <p><code>postcss-loader</code> can also be applied in combination with other pre-processors mentioned above.</p> <h2 id="babel"><a href="#babel" aria-hidden="true" class="header-anchor">#</a> Babel</h2> <div class="language-bash extra-class"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> -D babel-core babel-loader
</code></pre></div><div class="language-js extra-class"><pre class="language-js"><code><span class="token comment">// webpack.config.js -&gt; module.rules</span>
<span class="token punctuation">{</span>
  test<span class="token punctuation">:</span> <span class="token regex">/\.js?$/</span><span class="token punctuation">,</span>
  loader<span class="token punctuation">:</span> <span class="token string">'babel-loader'</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Configuration of Babel can be done via <code>.babelrc</code> or <code>babel-loader</code> options.</p> <h3 id="excluding-node-modules"><a href="#excluding-node-modules" aria-hidden="true" class="header-anchor">#</a> Excluding node_modules</h3> <p>It is common to have <code>exclude: /node_modules/</code> for JS transpilation rules (e.g. <code>babel-loader</code>) that apply to <code>.js</code> files. Due to the inference change of v15, if you import a Vue SFC inside <code>node_modules</code>, its <code>&lt;script&gt;</code> part will be excluded from transpilation as well.</p> <p>In order to ensure JS transpilation is applied to Vue SFCs in <code>node_modules</code>, you need to whitelist them by using an exclude function instead:</p> <div class="language-js extra-class"><pre class="language-js"><code><span class="token punctuation">{</span>
  test<span class="token punctuation">:</span> <span class="token regex">/\.js$/</span><span class="token punctuation">,</span>
  loader<span class="token punctuation">:</span> <span class="token string">'babel-loader'</span><span class="token punctuation">,</span>
  exclude<span class="token punctuation">:</span> file <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>
    <span class="token regex">/node_modules/</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
    <span class="token operator">!</span><span class="token regex">/\.vue\.js/</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="typescript"><a href="#typescript" aria-hidden="true" class="header-anchor">#</a> TypeScript</h2> <div class="language-bash extra-class"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> -D typescript ts-loader
</code></pre></div><div class="language-js extra-class"><pre class="language-js"><code><span class="token comment">// webpack.config.js</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  resolve<span class="token punctuation">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// Add smthg as a resolvable extension.</span>
    extensions<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">'.ts'</span><span class="token punctuation">,</span> <span class="token string">'.js'</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  module<span class="token punctuation">:</span> <span class="token punctuation">{</span>
    rules<span class="token punctuation">:</span> <span class="token punctuation">[</span>
      <span class="token comment">// ... other rules omitted</span>
      <span class="token punctuation">{</span>
        test<span class="token punctuation">:</span> <span class="token regex">/\.ts$/</span><span class="token punctuation">,</span>
        loader<span class="token punctuation">:</span> <span class="token string">'ts-loader'</span><span class="token punctuation">,</span>
        options<span class="token punctuation">:</span> <span class="token punctuation">{</span> appendTsSuffixTo<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token regex">/\.vue$/</span><span class="token punctuation">]</span> <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// ... plugin omitted</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Configuration of TypeScipt can be done via <code>tsconfig.json</code>. Also see docs for <a href="https://github.com/TypeStrong/ts-loader" target="_blank" rel="noopener noreferrer">ts-loader<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" x="0px" y="0px" viewBox="0 0 100 100" width="15" height="15" class="icon outbound"><path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path> <polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon></svg></a>.</p> <h2 id="pug"><a href="#pug" aria-hidden="true" class="header-anchor">#</a> Pug</h2> <p>Processing templates is a little different, because most webpack template loaders such as <code>pug-loader</code> return a template function instead of a compiled HTML string. Instead of using <code>pug-loader</code>, we need to use a loader that returns the raw HTML string, e.g. <code>pug-plain-loader</code>:</p> <div class="language-bash extra-class"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> -D pug pug-plain-loader
</code></pre></div><div class="language-js extra-class"><pre class="language-js"><code><span class="token comment">// webpack.config.js -&gt; module.rules</span>
<span class="token punctuation">{</span>
  test<span class="token punctuation">:</span> <span class="token regex">/\.pug$/</span><span class="token punctuation">,</span>
  loader<span class="token punctuation">:</span> <span class="token string">'pug-plain-loader'</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Then you can write:</p> <div class="language-html extra-class"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">&quot;</span>pug<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
div
  h1 Hello world!
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>If you also intend to use it to import <code>.pug</code> files as HTML strings in JavaScript, you will need to chain <code>raw-loader</code> after the preprocessing loader. Note however adding <code>raw-loader</code> would break the usage in Vue components, so you need to have two rules, one of them targeting Vue files using a <code>resourceQuery</code>, the other one (fallback) targeting JavaScript imports:</p> <div class="language-js extra-class"><pre class="language-js"><code><span class="token comment">// webpack.config.js -&gt; module.rules</span>
<span class="token punctuation">{</span>
  test<span class="token punctuation">:</span> <span class="token regex">/\.pug$/</span><span class="token punctuation">,</span>
  oneOf<span class="token punctuation">:</span> <span class="token punctuation">[</span>
    <span class="token comment">// this applies to smthg in Vue components</span>
    <span class="token punctuation">{</span>
      resourceQuery<span class="token punctuation">:</span> <span class="token regex">/^\?vue/</span><span class="token punctuation">,</span>
      use<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">'pug-plain-loader'</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// this applies to pug imports inside JavaScript</span>
    <span class="token punctuation">{</span>
      use<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">'raw-loader'</span><span class="token punctuation">,</span> <span class="token string">'pug-plain-loader'</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div></div> <div class="page-edit"><!----> <!----></div> <div class="page-nav"><p class="inner"><span class="prev">
        ←
        <a href="/guide/asset-url.html" class="prev">
          Asset URL Handling
        </a></span> <span class="next"><a href="/guide/scoped-css.html">
          Scoped CSS
        </a>
        →
      </span></p></div> <div class="bsa-cpc-wrapper"><div class="bsa-cpc"></div></div></div> <!----></div></div>
    <script src="/assets/js/13.a2c136f9.js" defer></script><script src="/assets/js/app.a951c26d.js" defer></script>
  </body>
</html>
`;