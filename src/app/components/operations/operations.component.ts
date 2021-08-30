import { Component, OnInit } from '@angular/core';
import { DropDownList } from '../../models/currency.model';
import {
  Form,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { SnackBarService } from '../../services/snack-bar.service';
import { Operation } from '../../models/operation.model';
import { OperationsService } from '../../services/operations.service';
import { UsersService } from '../../services/users.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss'],
})
export class OperationsComponent implements OnInit {
  form: FormGroup;

  CurrencyList: DropDownList[] = [
    { code: 'AFN', text: 'Afghanistan Afghanis – AFN' },
    { code: 'ALL', text: 'Albania Leke – ALL' },
    { code: 'DZD', text: 'Algeria Dinars – DZD' },
    { code: 'ARS', text: 'Argentina Pesos – ARS' },
    { code: 'AUD', text: 'Australia Dollars – AUD' },
    { code: 'ATS', text: 'Austria Schillings – ATS' },
    { code: 'BSD', text: 'Bahamas Dollars – BSD' },
    { code: 'BHD', text: 'Bahrain Dinars – BHD' },
    { code: 'BDT', text: 'Bangladesh Taka – BDT' },
    { code: 'BBD', text: 'Barbados Dollars – BBD' },
    { code: 'BEF', text: 'Belgium Francs – BEF' },
    { code: 'BMD', text: 'Bermuda Dollars – BMD' },
    { code: 'BRL', text: 'Brazil Reais – BRL' },
    { code: 'BGN', text: 'Bulgaria Leva – BGN' },
    { code: 'CAD', text: 'Canada Dollars – CAD' },
    { code: 'XOF', text: 'CFA BCEAO Francs – XOF' },
    { code: 'XAF', text: 'CFA BEAC Francs – XAF' },
    { code: 'CLP', text: 'Chile Pesos – CLP' },
    { code: 'CNY', text: 'China Yuan Renminbi – CNY' },
    { code: 'COP', text: 'Colombia Pesos – COP' },
    { code: 'XPF', text: 'CFP Francs – XPF' },
    { code: 'CRC', text: 'Costa Rica Colones – CRC' },
    { code: 'HRK', text: 'Croatia Kuna – HRK' },
    { code: 'CYP', text: 'Cyprus Pounds – CYP' },
    { code: 'CZK', text: 'Czech Republic Koruny – CZK' },
    { code: 'DKK', text: 'Denmark Kroner – DKK' },
    { code: 'DEM', text: 'Deutsche (Germany) Marks – DEM' },
    { code: 'DOP', text: 'Dominican Republic Pesos – DOP' },
    { code: 'NLG', text: 'Dutch (Netherlands) Guilders - NLG' },
    { code: 'XCD', text: 'Eastern Caribbean Dollars – XCD' },
    { code: 'EGP', text: 'Egypt Pounds – EGP' },
    { code: 'EEK', text: 'Estonia Krooni – EEK' },
    { code: 'EUR', text: 'Euro – EUR' },
    { code: 'FJD', text: 'Fiji Dollars – FJD' },
    { code: 'FIM', text: 'Finland Markkaa – FIM' },
    { code: 'FRF', text: 'France Francs – FRF' },
    { code: 'DEM', text: 'Germany Deutsche Marks – DEM' },
    { code: 'XAU', text: 'Gold Ounces – XAU' },
    { code: 'GRD', text: 'Greece Drachmae – GRD' },
    { code: 'GTQ', text: 'Guatemalan Quetzal – GTQ' },
    { code: 'NLG', text: 'Holland (Netherlands) Guilders – NLG' },
    { code: 'HKD', text: 'Hong Kong Dollars – HKD' },
    { code: 'HUF', text: 'Hungary Forint – HUF' },
    { code: 'ISK', text: 'Iceland Kronur – ISK' },
    { code: 'XDR', text: 'IMF Special Drawing Right – XDR' },
    { code: 'INR', text: 'India Rupees – INR' },
    { code: 'IDR', text: 'Indonesia Rupiahs – IDR' },
    { code: 'IRR', text: 'Iran Rials – IRR' },
    { code: 'IQD', text: 'Iraq Dinars – IQD' },
    { code: 'IEP', text: 'Ireland Pounds – IEP' },
    { code: 'ILS', text: 'Israel New Shekels – ILS' },
    { code: 'ITL', text: 'Italy Lire – ITL' },
    { code: 'JMD', text: 'Jamaica Dollars – JMD' },
    { code: 'JPY', text: 'Japan Yen – JPY' },
    { code: 'JOD', text: 'Jordan Dinars – JOD' },
    { code: 'KES', text: 'Kenya Shillings – KES' },
    { code: 'KRW', text: 'Korea (South) Won – KRW' },
    { code: 'KWD', text: 'Kuwait Dinars – KWD' },
    { code: 'LBP', text: 'Lebanon Pounds – LBP' },
    { code: 'LUF', text: 'Luxembourg Francs – LUF' },
    { code: 'MYR', text: 'Malaysia Ringgits – MYR' },
    { code: 'MTL', text: 'Malta Liri – MTL' },
    { code: 'MUR', text: 'Mauritius Rupees – MUR' },
    { code: 'MXN', text: 'Mexico Pesos – MXN' },
    { code: 'MAD', text: 'Morocco Dirhams – MAD' },
    { code: 'NLG', text: 'Netherlands Guilders – NLG' },
    { code: 'NZD', text: 'New Zealand Dollars – NZD' },
    { code: 'NOK', text: 'Norway Kroner – NOK' },
    { code: 'OMR', text: 'Oman Rials – OMR' },
    { code: 'PKR', text: 'Pakistan Rupees – PKR' },
    { code: 'XPD', text: 'Palladium Ounces – XPD' },
    { code: 'PEN', text: 'Peru Nuevos Soles – PEN' },
    { code: 'PHP', text: 'Philippines Pesos – PHP' },
    { code: 'XPT', text: 'Platinum Ounces – XPT' },
    { code: 'PLN', text: 'Poland Zlotych – PLN' },
    { code: 'PTE', text: 'Portugal Escudos – PTE' },
    { code: 'QAR', text: 'Qatar Riyals – QAR' },
    { code: 'RON', text: 'Romania New Lei – RON' },
    { code: 'ROL', text: 'Romania Lei – ROL' },
    { code: 'RUB', text: 'Russia Rubles – RUB' },
    { code: 'SAR', text: 'Saudi Arabia Riyals – SAR' },
    { code: 'XAG', text: 'Silver Ounces – XAG' },
    { code: 'SGD', text: 'Singapore Dollars – SGD' },
    { code: 'SKK', text: 'Slovakia Koruny – SKK' },
    { code: 'SIT', text: 'Slovenia Tolars – SIT' },
    { code: 'ZAR', text: 'South Africa Rand – ZAR' },
    { code: 'KRW', text: 'South Korea Won – KRW' },
    { code: 'ESP', text: 'Spain Pesetas – ESP' },
    { code: 'XDR', text: 'Special Drawing Rights (IMF) – XDR' },
    { code: 'LKR', text: 'Sri Lanka Rupees – LKR' },
    { code: 'SDD', text: 'Sudan Dinars – SDD' },
    { code: 'SEK', text: 'Sweden Kronor – SEK' },
    { code: 'CHF', text: 'Switzerland Francs – CHF' },
    { code: 'TWD', text: 'Taiwan New Dollars – TWD' },
    { code: 'THB', text: 'Thailand Baht – THB' },
    { code: 'TTD', text: 'Trinidad and Tobago Dollars – TTD' },
    { code: 'TND', text: 'Tunisia Dinars – TND' },
    { code: 'TRY', text: 'Turkey New Lira – TRY' },
    { code: 'AED', text: 'United Arab Emirates Dirhams – AED' },
    { code: 'GBP', text: 'United Kingdom Pounds – GBP' },
    { code: 'USD', text: 'United States Dollars – USD' },
    { code: 'VEB', text: 'Venezuela Bolivares – VEB' },
    { code: 'VND', text: 'Vietnam Dong – VND' },
    { code: 'ZMK', text: 'Zambia Kwacha – ZMK' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    public snackBarService: SnackBarService,
    private usersService: UsersService,
    private operationsService: OperationsService
  ) {
    this.form = this.formBuilder.group({
      amount: [
        '0',
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern('^(0|[1-9][0-9]*)$'),
        ],
      ],
      category: ['', [Validators.required, Validators.maxLength(20)]],
      date: ['', Validators.required],
      currency: ['ARS', Validators.required],
      type: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  save(form: any, formDirective: FormGroupDirective): void {
    let currentUser = this.usersService.getCurrentUser();
    let operation: Operation = {
      userId: currentUser.id,
      amount: this.form.value.amount,
      category: this.form.value.category,
      date: this.form.value.date,
      currency: this.form.value.currency,
      type: this.form.value.type,
      account: 'pesos',
    };

    this.operationsService.addOperation(operation);

    formDirective.resetForm();
    this.form.reset();
    this.snackBarService.openSnackBar(
      'La operación ha sido guardada!',
      'green-snackbar'
    );
  }
}
