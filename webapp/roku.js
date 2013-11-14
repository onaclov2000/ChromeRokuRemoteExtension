var rokuControl = {select        : function(){ roku('keypress','Select'       ); },
                   home          : function(){ roku('keypress','Home'         ); },
                   rev           : function(){ roku('keypress','Rev'          ); },
                   fwd           : function(){ roku('keypress','Fwd'          ); },
                   play          : function(){ roku('keypress','Play'         ); },
                   left          : function(){ roku('keypress','Left'         ); },
                   right         : function(){ roku('keypress','Right'        ); },
                   down          : function(){ roku('keypress','Down'         ); },
                   up            : function(){ roku('keypress','Up'           ); },
                   back          : function(){ roku('keypress','Back'         ); },
                   instantreplay : function(){ roku('keypress','InstantReplay'); },
                   backspace     : function(){ roku('keypress','Backspace'    ); },
                   search        : function(){ roku('keypress','Search'       ); },
                   enter         : function(){ roku('keypress','Enter'        ); },
                   a             : function(){ roku('keypress','Lit_a'        ); },
                   b             : function(){ roku('keypress','Lit_b'        ); },
                   c             : function(){ roku('keypress','Lit_c'        ); },
                   d             : function(){ roku('keypress','Lit_d'        ); },
                   e             : function(){ roku('keypress','Lit_e'        ); },
                   f             : function(){ roku('keypress','Lit_f'        ); },
                   g             : function(){ roku('keypress','Lit_g'        ); },
                   h             : function(){ roku('keypress','Lit_h'        ); },
                   i             : function(){ roku('keypress','Lit_i'        ); },
                   j             : function(){ roku('keypress','Lit_j'        ); },
                   k             : function(){ roku('keypress','Lit_k'        ); },
                   l             : function(){ roku('keypress','Lit_l'        ); },
                   m             : function(){ roku('keypress','Lit_m'        ); },
                   n             : function(){ roku('keypress','Lit_n'        ); },
                   o             : function(){ roku('keypress','Lit_o'        ); },
                   p             : function(){ roku('keypress','Lit_p'        ); },
                   q             : function(){ roku('keypress','Lit_q'        ); },
                   r             : function(){ roku('keypress','Lit_r'        ); },
                   s             : function(){ roku('keypress','Lit_s'        ); },
                   t             : function(){ roku('keypress','Lit_t'        ); },
                   u             : function(){ roku('keypress','Lit_u'        ); },
                   v             : function(){ roku('keypress','Lit_v'        ); },
                   w             : function(){ roku('keypress','Lit_w'        ); },
                   x             : function(){ roku('keypress','Lit_x'        ); },
                   y             : function(){ roku('keypress','Lit_y'        ); },
                   z             : function(){ roku('keypress','Lit_z'        ); },
                                                             }
var roku = function(doThis,forThisKey)
{
  //doThis typically will be either keypress, keydown, keyup, I usually use keypress, but you're welcome to use this for other cases
  // forThisKey well I would say just check the ROku SDK cause I'm not going to re-list them all here.
   var xmlhttp = new XMLHttpRequest();
   // For Troubleshooting (what is being sent situations)
   //console.log(doThis);
   //console.log(forThisKey);
   xmlhttp.open("POST","http://" + rokuIP + "/" + doThis + "/" + forThisKey,true);   
   xmlhttp.send();
};
