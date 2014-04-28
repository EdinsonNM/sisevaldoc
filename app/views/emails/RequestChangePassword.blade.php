<table width="584" style="margin:0 auto;max-width:584px">
    <tbody><tr>
      <td>
        
        <table width="584px" cellpadding="24" style="background:#fff;border:1px solid #a8adad;">
  <tbody><tr>
    <td>
      <p style="margin-top:0;margin-bottom:12px">
		Estimado {{$user['first_name']}} ,<br/>
      	Este correo confirma tu reciente petición de cambio de contraseña de la cuenta {{$user['username']}} de Sisevaldoc:</p>

      <p style="margin-top:12px;margin-bottom:12px">Si tu contraseña de Sisevaldoc fue cambiada sin su conocimiento, presiona click en el vínculo inferior para cambiarla de nuevo:</p>

      <table cellspacing="0" cellpadding="0" border="0" style="margin-top:18px;margin-right:0;margin-bottom:18px;margin-left:0">
        <tbody><tr>
          <td height="44" align="center"  style="background-repeat:repeat-x;border-radius:3px;background-color:#45a32f;border:1px solid #3e7a52;color:#ffffff;font-weight:normal;white-space:nowrap;height:44px">
          <a href="{{ URL::to('loginuser/resetpassword?username='.$user['username'].'&code='.$resetCode, array(), false)}}" style="color:#ffffff;text-decoration:none;font-size:16px;text-align:center;vertical-align:baseline;font-weight:normal" target="_blank">
          
           <span lang="en" style="padding-top:16px;padding-right:40px;padding-bottom:16px;padding-left:40px;color:#fff">Restablecer contraseña</span> 
          </a></td>
        </tr>
      </tbody></table>
	
      <p style="margin-top:0;margin-bottom:12px">El equipo de Sisevaldoc</p>
    </td>
  </tr>
</tbody></table>

       
      </td>
    </tr>
  </tbody></table>
