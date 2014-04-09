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
   c) {
      return function () {
         switch (_v0.ctor)
         {case "_Tuple2":
            return {ctor: "_Tuple2"
                   ,_0: Basics.toFloat(_v0._0) - c.w / 2
                   ,_1: c.h / 2 - Basics.toFloat(_v0._1)};}
         _E.Case($moduleName,
         "on line 53, column 4 to 41");
      }();
   });
   var diff = F2(function (_v4,
   _v5) {
      return function () {
         switch (_v5.ctor)
         {case "_Tuple2":
            return function () {
                 switch (_v4.ctor)
                 {case "_Tuple2":
                    return {ctor: "_Tuple2"
                           ,_0: _v4._0 - _v5._0
                           ,_1: _v4._1 - _v5._1};}
                 _E.Case($moduleName,
                 "on line 49, column 23 to 33");
              }();}
         _E.Case($moduleName,
         "on line 49, column 23 to 33");
      }();
   });
   var dist = F2(function (_v12,
   _v13) {
      return function () {
         switch (_v13.ctor)
         {case "_Tuple2":
            return function () {
                 switch (_v12.ctor)
                 {case "_Tuple2":
                    return Basics.sqrt(Math.pow(_v12._0 - _v13._0,
                      2) + Math.pow(_v12._1 - _v13._1,
                      2));}
                 _E.Case($moduleName,
                 "on line 48, column 22 to 49");
              }();}
         _E.Case($moduleName,
         "on line 48, column 22 to 49");
      }();
   });
   var near = F2(function (p,p$) {
      return _U.cmp(10,
      A2(dist,p,p$)) > 0;
   });
   var model = {_: {}
               ,forms: _J.toList([])
               ,pts: _J.toList([])
               ,start: {ctor: "_Tuple2"
                       ,_0: 0
                       ,_1: 0}
               ,sz: {_: {},h: 400,w: 400}};
   var Straight = {ctor: "Straight"};
   var RightTurn = {ctor: "RightTurn"};
   var LeftTurn = {ctor: "LeftTurn"};
   var direction = F2(function (_v20,
   _v21) {
      return function () {
         switch (_v21.ctor)
         {case "_Tuple2":
            return function () {
                 switch (_v20.ctor)
                 {case "_Tuple2":
                    return function () {
                         var cross = _v20._0 * _v21._1 - _v20._1 * _v21._0;
                         return _U.cmp(cross,
                         0) < 0 ? LeftTurn : _U.cmp(cross,
                         0) > 0 ? RightTurn : Straight;
                      }();}
                 _E.Case($moduleName,
                 "between lines 56 and 59");
              }();}
         _E.Case($moduleName,
         "between lines 56 and 59");
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
   var display = function (m) {
      return A2(Basics.flip,
      Graphics.Element.above,
      Text.asText({ctor: "_Tuple6"
                  ,_0: m.pts
                  ,_1: m.start
                  ,_2: "dirs"
                  ,_3: getDirections(m.pts)
                  ,_4: "sort"
                  ,_5: A2(List.sortBy,
                  Basics.fst,
                  m.pts)}))(A2(Graphics.Collage.collage,
      Basics.round(m.sz.w),
      Basics.round(m.sz.h))(_L.append(_J.toList([Graphics.Collage.outlined(Graphics.Collage.defaultLine)(A2(Graphics.Collage.rect,
                                                m.sz.w,
                                                m.sz.h))
                                                ,Graphics.Collage.traced(Graphics.Collage.defaultLine)(Graphics.Collage.path(m.pts))]),
      m.forms)));
   };
   var hull = function (pts) {
      return function () {
         var go = F3(function (dir,
         pts,
         stack) {
            return function () {
               var _v35 = {ctor: "_Tuple2"
                          ,_0: pts
                          ,_1: stack};
               switch (_v35.ctor)
               {case "_Tuple2":
                  switch (_v35._0.ctor)
                    {case "::":
                       switch (_v35._1.ctor)
                         {case "::":
                            switch (_v35._1._1.ctor)
                              {case "::":
                                 return _U.eq(A3(getDirection,
                                   _v35._1._1._0,
                                   _v35._1._0,
                                   _v35._0._0),
                                   dir) ? A3(go,
                                   dir,
                                   _v35._0._1,
                                   {ctor: "::"
                                   ,_0: _v35._0._0
                                   ,_1: stack}) : A3(go,
                                   dir,
                                   pts,
                                   {ctor: "::"
                                   ,_0: _v35._1._1._0
                                   ,_1: _v35._1._1._1});
                                 case "[]": return A3(go,
                                   dir,
                                   _v35._0._1,
                                   {ctor: "::"
                                   ,_0: _v35._0._0
                                   ,_1: stack});}
                              break;}
                         break;
                       case "[]": return _v35._1;}
                    break;}
               _E.Case($moduleName,
               "between lines 70 and 76");
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
         var hullOutLine = Graphics.Collage.outlined(_U.replace([["color"
                                                                 ,Color.red]],
         Graphics.Collage.defaultLine))(Graphics.Collage.polygon(hull(m.pts)));
         var outline = Graphics.Collage.outlined(Graphics.Collage.defaultLine)(Graphics.Collage.polygon(m.pts));
         var rawShape = Graphics.Collage.filled(Color.gray)(Graphics.Collage.polygon(m.pts));
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
         var _v44 = m.pts;
         switch (_v44.ctor)
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
   var Resize = function (a) {
      return {ctor: "Resize"
             ,_0: a};
   };
   var Click = function (a) {
      return {ctor: "Click",_0: a};
   };
   var evS = Signal.merges(_J.toList([A2(Signal._op["<~"],
                                     Resize,
                                     Window.dimensions)
                                     ,A2(Signal._op["<~"],
                                     Click,
                                     A2(Signal.sampleOn,
                                     Mouse.clicks,
                                     Mouse.position))]));
   var update = F2(function (ev,
   m) {
      return function () {
         switch (ev.ctor)
         {case "Click":
            return A2(addPoint,
              A2(toCollageTrans,ev._0,m.sz),
              m);
            case "Resize":
            switch (ev._0.ctor)
              {case "_Tuple2":
                 return _U.replace([["sz"
                                    ,{_: {}
                                     ,h: Basics.toFloat(ev._0._1 - 50)
                                     ,w: Basics.toFloat(ev._0._0)}]],
                   m);}
              break;}
         _E.Case($moduleName,
         "between lines 19 and 21");
      }();
   });
   var main = A2(Signal._op["<~"],
   display,
   A3(Signal.foldp,
   update,
   model,
   evS));
   _elm.Main.values = {_op: _op
                      ,model: model
                      ,evS: evS
                      ,update: update
                      ,addPoint: addPoint
                      ,processShape: processShape
                      ,display: display
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