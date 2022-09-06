
import jMoment from 'jalali-moment';
export function Common() {

    const formatDate = (date: string): string => {
        return jMoment(date).format('YYYY-MM-DD');
    }

    const jalaliToGregorian = (j_y: number, j_m: number, j_d: number) => {
        return jMoment.from(`$${j_y}-${j_m}-${j_d}`, 'fa', 'YYYY-MM-DD').format('YYYY-MM-DD')
    }

    const gregorianToJalali = (date: string) => {
        var formatedDate = formatDate(date);
        return jMoment(formatedDate, 'YYYY-MM-DD')
            .locale('fa')
            .format('YYYY-MM-DD');
    }

    return {
        formatDate,
        gregorianToJalali,
        jalaliToGregorian
    }
}