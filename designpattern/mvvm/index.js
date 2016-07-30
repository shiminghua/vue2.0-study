'use strict';
~(function() {

    let window = this || (0, eval)('this');

    const FONTSIZE = function () {
        return parseInt(document.body.currentStyle ? document.body.currentStyle['fontSize'] : getComputedStyle(document.body, false)['fontSize']);
    }();

    let VM = function() {

        // 组件创建策略对象
        var Method = {
            // 进度条组件创建方法
            progressbar: function(dom, data) {
                let progress = document.createElement('div'),
                    param = data.data;
                progress.style.width = (param.position || 100) + '%';
                dom.className += ' ui-progressbar';
                dom.appendChild(progress);
            },
            // 滑动条组件创建方法
            silder: function(dom, data) {
                let bar = document.createElement('span'),
                    progress = document.createElement('div'),
                    totleText = null,
                    progressText = null,
                    param = data.data,
                    width = dom.clientWidth,
                    left = dom.offsetLeft,
                    realWidth = (param.position || 100) * width / 100;
                dom.innerHTML = '';
                if(param.totle) {
                    totleText = document.createElement('b');
                    progressText = document.createElement('em');
                    totleText.innerHTML = param.totle;
                    dom.appendChild(totleText);
                    dom.appendChild(progressText);
                }
                setStyle(realWidth);
                dom.className += ' ui-slider';
                dom.appendChild(progress);
                dom.appendChild(bar);

                function setStyle(w) {
                    progress.style.width = w + 'px';
                    bar.style.left = w - FONTSIZE / 2 + 'px';
                    if(progressText) {
                        progressText.style.left = w - FONTSIZE / 2 * 2.4 + 'px';
                        progressText.innerHTML = parseFloat(w / width * 100).toFixed(2) + '%';
                    }
                }


                bar.onmousedown = function() {
                    document.onmousemove = function(event) {
                        let e = event || window.event;
                        let w = e.clientX - left;
                        setStyle(w < width ? (w > 0 ? w : 0) : width);
                    }
                    document.onselectstart = function() {
                        return false;
                    }
                    document.onmouseup = function() {
                        document.onmousemove = null;
                        document.onselectstart = null;
                    }
                }
            }
        };

        /***************
         * 
        */
        function getBindData(dom) {
            let data = dom.getAttribute('data-bind');
            return !!data && (new Function("return ({ " + data + " })"))();
        }

        return function() {
            var doms = document.body.getElementsByTagName('*'),
                ctx = null;
            console.log(doms);
            for(let i = 0; i < doms.length; i++) {
                ctx = getBindData(doms[i]);
                console.log(ctx);
                ctx.type && Method[ctx.type] && Method[ctx.type](doms[i], ctx);
            }
        }

    } ();

    window.VM = VM;
    // console.log(FONTSIZE, window);

})();