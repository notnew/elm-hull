Elm.Main = Elm.Main || {};
Elm.Main.make = function (_elm) {
   _elm.Main = _elm.Main || {};
   if (_elm.Main.values)
   return _elm.Main.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _E = _N.Error.make(_elm),
   _J = _N.JavaScript.make(_elm),
   $moduleName = "Main";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Input = Elm.Graphics.Input.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Mouse = Elm.Mouse.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Prelude = Elm.Prelude.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var Window = Elm.Window.make(_elm);
   var _op = {};
   var $undefined = $undefined;
   var toCollageTrans = F2(function (_v0,
   _v1) {
      return function () {
         switch (_v1.ctor)
         {case "_Tuple2":
            return function () {
                 switch (_v0.ctor)
                 {case "_Tuple2":
                    return function () {
                         var $ = {ctor: "_Tuple2"
                                 ,_0: _v1._0 / 2 | 0
                                 ,_1: _v1._1 / 2 | 0},
                         halfWidth = $._0,
                         halfHeight = $._1;
                         var $ = {ctor: "_Tuple2"
                                 ,_0: _v0._0 - halfWidth
                                 ,_1: halfHeight - _v0._1},
                         x$ = $._0,
                         y$ = $._1;
                         return {ctor: "_Tuple2"
                                ,_0: Basics.toFloat(x$)
                                ,_1: Basics.toFloat(y$)};
                      }();}
                 _E.Case($moduleName,
                 "between lines 54 and 57");
              }();}
         _E.Case($moduleName,
         "between lines 54 and 57");
      }();
   });
   var diff = F2(function (_v8,
   _v9) {
      return function () {
         switch (_v9.ctor)
         {case "_Tuple2":
            return function () {
                 switch (_v8.ctor)
                 {case "_Tuple2":
                    return {ctor: "_Tuple2"
                           ,_0: _v8._0 - _v9._0
                           ,_1: _v8._1 - _v9._1};}
                 _E.Case($moduleName,
                 "on line 50, column 23 to 33");
              }();}
         _E.Case($moduleName,
         "on line 50, column 23 to 33");
      }();
   });
   var dist = F2(function (_v16,
   _v17) {
      return function () {
         switch (_v17.ctor)
         {case "_Tuple2":
            return function () {
                 switch (_v16.ctor)
                 {case "_Tuple2":
                    return Basics.sqrt(Math.pow(_v16._0 - _v17._0,
                      2) + Math.pow(_v16._1 - _v17._1,
                      2));}
                 _E.Case($moduleName,
                 "on line 49, column 22 to 49");
              }();}
         _E.Case($moduleName,
         "on line 49, column 22 to 49");
      }();
   });
   var near = F2(function (p,p$) {
      return _U.cmp(10,
      A2(dist,p,p$)) > 0;
   });
   var drawInProgress = function (_v24) {
      return function () {
         return List.isEmpty(_v24.pts) ? _J.toList([]) : _J.toList([Graphics.Collage.traced(Graphics.Collage.defaultLine)(Graphics.Collage.path(_v24.pts))
                                                                   ,Graphics.Collage.move(_v24.start)(Graphics.Collage.filled(Color.black)(Graphics.Collage.circle(2)))]);
      }();
   };
   var display = F2(function (_v26,
   m) {
      return function () {
         switch (_v26.ctor)
         {case "_Tuple2":
            return function () {
                 var $ = {ctor: "_Tuple2"
                         ,_0: Basics.max(400)(Basics.round(0.7 * Basics.toFloat(_v26._0)))
                         ,_1: Basics.max(400)(Basics.round(0.7 * Basics.toFloat(_v26._1)))},
                 w$ = $._0,
                 h$ = $._1;
                 var border = Graphics.Collage.outlined(Graphics.Collage.defaultLine)(A2(Graphics.Collage.rect,
                 Basics.toFloat(w$),
                 Basics.toFloat(h$)));
                 return A3(Graphics.Element.container,
                 _v26._0,
                 _v26._1,
                 Graphics.Element.middle)(Graphics.Element.color(Color.white)(A2(Graphics.Collage.collage,
                 w$,
                 h$)({ctor: "::"
                     ,_0: border
                     ,_1: _L.append(m.forms,
                     drawInProgress(m))})));
              }();}
         _E.Case($moduleName,
         "between lines 33 and 37");
      }();
   });
   var clickS = Signal.sampleOn(Mouse.clicks)(A2(Signal._op["~"],
   A2(Signal._op["<~"],
   toCollageTrans,
   Mouse.position),
   Window.dimensions));
   var model = {_: {}
               ,forms: _J.toList([])
               ,pts: _J.toList([])
               ,start: {ctor: "_Tuple2"
                       ,_0: 0
                       ,_1: 0}};
   var Straight = {ctor: "Straight"};
   var RightTurn = {ctor: "RightTurn"};
   var LeftTurn = {ctor: "LeftTurn"};
   var direction = F2(function (_v30,
   _v31) {
      return function () {
         switch (_v31.ctor)
         {case "_Tuple2":
            return function () {
                 switch (_v30.ctor)
                 {case "_Tuple2":
                    return function () {
                         var cross = _v30._0 * _v31._1 - _v30._1 * _v31._0;
                         return _U.cmp(cross,
                         0) < 0 ? LeftTurn : _U.cmp(cross,
                         0) > 0 ? RightTurn : Straight;
                      }();}
                 _E.Case($moduleName,
                 "between lines 60 and 63");
              }();}
         _E.Case($moduleName,
         "between lines 60 and 63");
      }();
   });
   var getDirection = F3(function (a,
   b,
   c) {
      return A2(direction,
      A2(diff,b,a),
      A2(diff,c,b));
   });
   var getDirections = function (ps) {
      return function () {
         switch (ps.ctor)
         {case "::": switch (ps._1.ctor)
              {case "::":
                 switch (ps._1._1.ctor)
                   {case "::": return {ctor: "::"
                                      ,_0: A3(getDirection,
                                      ps._0,
                                      ps._1._0,
                                      ps._1._1._0)
                                      ,_1: getDirections({ctor: "::"
                                                         ,_0: ps._1._0
                                                         ,_1: {ctor: "::"
                                                              ,_0: ps._1._1._0
                                                              ,_1: ps._1._1._1}})};}
                   break;}
              break;}
         return _J.toList([]);
      }();
   };
   var hull = function (pts) {
      return function () {
         var go = F3(function (dir,
         pts,
         stack) {
            return function () {
               var _v45 = {ctor: "_Tuple2"
                          ,_0: pts
                          ,_1: stack};
               switch (_v45.ctor)
               {case "_Tuple2":
                  switch (_v45._0.ctor)
                    {case "::":
                       switch (_v45._1.ctor)
                         {case "::":
                            switch (_v45._1._1.ctor)
                              {case "::":
                                 return _U.eq(A3(getDirection,
                                   _v45._1._1._0,
                                   _v45._1._0,
                                   _v45._0._0),
                                   dir) ? A3(go,
                                   dir,
                                   _v45._0._1,
                                   {ctor: "::"
                                   ,_0: _v45._0._0
                                   ,_1: stack}) : A3(go,
                                   dir,
                                   pts,
                                   {ctor: "::"
                                   ,_0: _v45._1._1._0
                                   ,_1: _v45._1._1._1});
                                 case "[]": return A3(go,
                                   dir,
                                   _v45._0._1,
                                   {ctor: "::"
                                   ,_0: _v45._0._0
                                   ,_1: stack});}
                              break;}
                         break;
                       case "[]": return _v45._1;}
                    break;}
               _E.Case($moduleName,
               "between lines 74 and 80");
            }();
         });
         var sorted = A2(List.sortBy,
         Basics.fst,
         pts);
         var top = A3(go,
         LeftTurn,
         List.tail(sorted),
         _J.toList([List.head(sorted)]));
         var bottom = A3(go,
         RightTurn,
         List.tail(sorted),
         _J.toList([List.head(sorted)]));
         return _L.append(top,
         List.reverse(bottom));
      }();
   };
   var processShape = function (m) {
      return function () {
         var hullStyle = _U.replace([["color"
                                     ,Color.red]
                                    ,["width",2]],
         Graphics.Collage.defaultLine);
         var hullOutLine = Graphics.Collage.outlined(hullStyle)(Graphics.Collage.polygon(hull(m.pts)));
         var outline = Graphics.Collage.outlined(Graphics.Collage.defaultLine)(Graphics.Collage.polygon(m.pts));
         var rawShape = Graphics.Collage.alpha(0.5)(Graphics.Collage.filled(Color.black)(Graphics.Collage.polygon(m.pts)));
         return _U.replace([["forms"
                            ,_L.append(m.forms,
                            _J.toList([rawShape
                                      ,outline
                                      ,hullOutLine]))]
                           ,["pts",_J.toList([])]],
         m);
      }();
   };
   var addPoint = F2(function (p,
   m) {
      return function () {
         var _v54 = m.pts;
         switch (_v54.ctor)
         {case "[]":
            return _U.replace([["pts"
                               ,_J.toList([p])]
                              ,["start",p]],
              m);}
         return A2(near,
         p,
         m.start) ? processShape(m) : _U.replace([["pts"
                                                  ,{ctor: "::"
                                                   ,_0: p
                                                   ,_1: m.pts}]],
         m);
      }();
   });
   var modelS = A3(Signal.foldp,
   addPoint,
   model,
   clickS);
   var main = A2(Signal._op["~"],
   A2(Signal._op["<~"],
   display,
   Window.dimensions),
   modelS);
   var Resize = function (a) {
      return {ctor: "Resize"
             ,_0: a};
   };
   var Click = function (a) {
      return {ctor: "Click",_0: a};
   };
   _elm.Main.values = {_op: _op
                      ,model: model
                      ,clickS: clickS
                      ,addPoint: addPoint
                      ,processShape: processShape
                      ,display: display
                      ,drawInProgress: drawInProgress
                      ,modelS: modelS
                      ,main: main
                      ,near: near
                      ,dist: dist
                      ,diff: diff
                      ,toCollageTrans: toCollageTrans
                      ,direction: direction
                      ,getDirection: getDirection
                      ,getDirections: getDirections
                      ,hull: hull
                      ,$undefined: $undefined
                      ,Click: Click
                      ,Resize: Resize
                      ,LeftTurn: LeftTurn
                      ,RightTurn: RightTurn
                      ,Straight: Straight};
   return _elm.Main.values;
};