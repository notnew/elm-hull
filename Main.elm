import Graphics.Input as Input
import Mouse
import Signal
import Window

data Event = Click (Int, Int) | Resize (Int, Int)

data Dir = LeftTurn | RightTurn | Straight

-- MODEL--
model = {forms=[], pts=[], start=(0,0)}

-- INPUT
clickS = sampleOn Mouse.clicks <|
           toCollageTrans <~  Mouse.position ~ Window.dimensions

-- UPDATE
addPoint p m = case m.pts of
  [] -> {m | pts <- [p], start <- p}
  _  -> if | near p m.start -> processShape m
           | otherwise -> {m | pts <- p::m.pts}

processShape m =
  let rawShape = polygon m.pts |> filled black |> alpha 0.5
      outline = outlined defaultLine <| polygon m.pts
      hullStyle = {defaultLine | color <- red, width <- 2}
      hullOutLine = outlined  hullStyle <| polygon <|
                      hull m.pts
  in {m | forms <- m.forms ++ [rawShape, outline, hullOutLine] , pts <- [] }

-- DISPLAY
display (w,h) m =
    let (w',h') = (max 400 <|  round <| 0.7 * toFloat w,
                   max 400 <|  round <| 0.7 * toFloat h)
        border = outlined defaultLine <| rect (toFloat w') (toFloat h')
    in container w h middle <| color white <|
       collage w' h' <| border::m.forms ++ drawInProgress m

drawInProgress {start, pts} =
    if | isEmpty pts -> []
       | otherwise   -> [ traced defaultLine <| path pts
                        , circle 2 |> filled black |> move start]

modelS = foldp addPoint model clickS
main = display <~ Window.dimensions ~ modelS

-- Helpers
near p p' = 10 > dist p p'
dist (x,y) (x',y') = sqrt <| (x-x')^2 + (y-y')^2
diff (x,y) (x',y') = (x-x', y-y')

-- translate mouse coords to collage coordinate system
toCollageTrans (x,y) (w,h) =
    let (halfWidth, halfHeight) = (w `div` 2, h `div` 2)
        -- y increases as the mouse lowers
        (x', y') = (x - halfWidth, halfHeight - y)
    in (toFloat x', toFloat y')

direction (x,y) (x', y') =
  let cross = x * y' - y * x' -- z component of cross product
  in if | cross < 0 -> LeftTurn
        | cross > 0 -> RightTurn
        | otherwise -> Straight

getDirection a b c = direction (diff b a) (diff c b)
getDirections ps = case ps of
  (a::b::c::ps) -> getDirection a b c :: getDirections (b::c::ps)
  _             -> []

hull pts =
  let sorted = sortBy fst pts
      top = go LeftTurn (tail sorted) [head sorted]
      bottom = go RightTurn (tail sorted) [head sorted]
      go dir pts stack = case (pts, stack) of
          ([], s)               -> s
          ((p::ps), (s::[]))    -> go dir ps (p::stack)
          ((p::ps), (b::a::ss)) ->
              if | getDirection a b p == dir -> go dir ps (p::stack)
                 | otherwise                 -> go dir pts (a::ss)
  in top ++ reverse bottom

undefined = undefined
