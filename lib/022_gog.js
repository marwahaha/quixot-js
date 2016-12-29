function gog_extend_feature(e) {
    console.log(e)
    if(!e.attr){
        e.attr = function (n, v) {
            this.setAttribute(n, v);
            return this;
        }
    }

    if(!e.width){
        e.width = function (v) {
            this.setAttribute('width', v);
            return this;
        }
    }

    if(!e.height){
        e.height = function (v) {
            this.setAttribute('height', v);
            return this;
        }
    }

    if(!e.add){
        e.add = function (c) {
            this.appendChild(c);
            return this;
        }
    }

    if(!e.x){
        e.x = function (v) {
            switch ((this.tagName+'').toLowerCase()){
                case 'circle':
                    this.setAttribute('cx', v);
            }
            return this;
        }
    }

    if(!e.y){
        e.y = function (v) {
            switch ((this.tagName+'').toLowerCase()){
                case 'circle':
                    this.setAttribute('cy', v);
            }
            return this;
        }
    }


    if(!e.stroke){
        e.stroke = function (v, w) {
            this.setAttribute('stroke', v);
            if(w){
                this.setAttribute('stroke-width', w);
            }
            return this;
        }
    }

    if(!e.fill){
        e.fill = function (v) {
            this.setAttribute('fill', v);
            return this;
        }
    }


    return e;
}




var gog_root = (function () {

    var ns = 'http://www.w3.org/2000/svg';

    function _movieclip_constructor(n) {
        var t = {}, c = [], _parent_id = null;


        function _width(v) {
            t.width = v;
            return this;
        }

        function _height(v) {
            t.height = v;
            return this;
        }

        function _stroke(c, w) {
            t.stroke = c;
            if(w){
                t['stroke-width'] = w;
            }
            return this;
        }


        function _x(v) {
            t.cx = v;
            return this;
        }

        function _y(v) {
           t.cy = v;
            return this;
        }


        function _add(e) {
            e.setParentId(get_data().id);
            c.push(e);
            return this;
        }

        function _radius(r) {
            t.r = r;
            return this;
        }

        function _fill(c) {
            t.fill = c;
            return this;
        }


        function get_data() {
            if(!t.id){
                t.id = util_dom_id('gog')
            }
            return t;
        }



        function _getContent() {

            var txt = '<' + n;
            util_obj_each(t, function (k, v) {
                txt+= ' '+k+'="'+v+'"';
            })
            txt+='>';

            util_array_each(c, function (i, o) {
                txt+=o.getContent();
            })


            txt+='</'+n+'>';
            return txt;
        }
        
        function _update() {
            console.log(_parent_id);
            if(_parent_id && document_getElementById(_parent_id)){

                document_getElementById(_parent_id).innerHTML = _getContent();
            }

            return this;
        }


        return {
            width: _width,
            add: _add,
            height: _height,
            x: _x,
            y:_y,
            stroke: _stroke,
            fill: _fill,
            radius: _radius,
            update: _update,
            getParentId: function () {
                return _parent_id;
            },
            setParentId: function (m) {
                _parent_id = m;
            },
            _isgog: true,
            getData: get_data,
            getContent: _getContent
        }

    }







    var rs = null;
    return {
        getStage: function () {
          if(rs === null){
              rs = new _movieclip_constructor('svg');

              var id =  util_dom_id('svgog'),
                  dv =  document_getElementSafe('div', id);
              rs.setParentId(id);
          }

          return rs;
        },
        newClip: function (s) {
            return new _movieclip_constructor(s);
        }

    }

})();

